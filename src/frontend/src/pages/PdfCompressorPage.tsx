import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Loader2,
  Upload,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

type PresetKey = "standard" | "high" | "maximum";
type CompressionStatus = "idle" | "parsing" | "compressing" | "done" | "error";

interface Preset {
  key: PresetKey;
  label: string;
  description: string;
  quality: number;
  badge: string;
}

const PRESETS: Preset[] = [
  {
    key: "standard",
    label: "Standard",
    description: "Good quality, decent size reduction",
    quality: 0.7,
    badge: "Balanced",
  },
  {
    key: "high",
    label: "High",
    description: "Smaller file, slight quality loss",
    quality: 0.5,
    badge: "Smaller",
  },
  {
    key: "maximum",
    label: "Maximum",
    description: "Smallest file, noticeable quality loss",
    quality: 0.3,
    badge: "Smallest",
  },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function reductionColor(ratio: number): string {
  if (ratio >= 0.5) return "text-green-400";
  if (ratio >= 0.25) return "text-accent";
  return "text-primary";
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function PdfCompressorPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Source file
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceName, setSourceName] = useState("");
  const [sourceSize, setSourceSize] = useState(0);

  // Settings
  const [preset, setPreset] = useState<PresetKey>("standard");
  const [advancedMode, setAdvancedMode] = useState(false);
  const [manualQuality, setManualQuality] = useState(0.7);
  const [manualScale, setManualScale] = useState(1.0);

  // Progress
  const [status, setStatus] = useState<CompressionStatus>("idle");
  const [progress, setProgress] = useState(0); // 0–100
  const [progressLabel, setProgressLabel] = useState("");

  // Result
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState(0);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const effectiveQuality = advancedMode
    ? manualQuality
    : PRESETS.find((p) => p.key === preset)!.quality;
  const effectiveScale = advancedMode ? manualScale : 1.0;

  // ---------------------------------------------------------------------------
  // File selection
  // ---------------------------------------------------------------------------

  const handleFilePick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setSourceFile(file);
      setSourceName(file.name.replace(/\.pdf$/i, ""));
      setSourceSize(file.size);
      setOutputBlob(null);
      setOutputSize(0);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(null);
      setStatus("idle");
      setProgress(0);
    },
    [outputUrl],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file || file.type !== "application/pdf") return;
      setSourceFile(file);
      setSourceName(file.name.replace(/\.pdf$/i, ""));
      setSourceSize(file.size);
      setOutputBlob(null);
      setOutputSize(0);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(null);
      setStatus("idle");
      setProgress(0);
    },
    [outputUrl],
  );

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  // ---------------------------------------------------------------------------
  // Compression
  // ---------------------------------------------------------------------------

  const compress = useCallback(async () => {
    if (!sourceFile) return;

    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputBlob(null);
    setOutputUrl(null);
    setOutputSize(0);
    setStatus("parsing");
    setProgress(0);
    setProgressLabel("Loading PDF…");

    try {
      // Dynamic import pdfjs-dist
      const pdfjsLib = await import("pdfjs-dist");
      // Set worker — use local worker from pdfjs-dist
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.mjs",
        import.meta.url,
      ).toString();

      const arrayBuffer = await sourceFile.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdfDoc.numPages;

      setProgressLabel(`Loaded — ${numPages} page${numPages > 1 ? "s" : ""}`);
      setProgress(5);
      setStatus("compressing");

      // jsPDF
      const { jsPDF } = await import("jspdf");

      let pdf: InstanceType<typeof jsPDF> | null = null;

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        setProgressLabel(`Rendering page ${pageNum} of ${numPages}…`);

        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: effectiveScale });

        // Off-screen canvas
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        await page.render({ canvasContext: ctx, viewport, canvas }).promise;

        const jpegDataUrl = canvas.toDataURL("image/jpeg", effectiveQuality);

        if (pageNum === 1) {
          const isPortrait = canvas.height >= canvas.width;
          pdf = new jsPDF({
            orientation: isPortrait ? "portrait" : "landscape",
            unit: "px",
            hotfixes: ["px_scaling"],
          });
          const pW = pdf.internal.pageSize.getWidth();
          const pH = pdf.internal.pageSize.getHeight();
          const scale = Math.min(pW / canvas.width, pH / canvas.height);
          const dw = canvas.width * scale;
          const dh = canvas.height * scale;
          const dx = (pW - dw) / 2;
          const dy = (pH - dh) / 2;
          pdf.addImage(jpegDataUrl, "JPEG", dx, dy, dw, dh);
        } else {
          pdf!.addPage();
          const pW = pdf!.internal.pageSize.getWidth();
          const pH = pdf!.internal.pageSize.getHeight();
          const scale = Math.min(pW / canvas.width, pH / canvas.height);
          const dw = canvas.width * scale;
          const dh = canvas.height * scale;
          const dx = (pW - dw) / 2;
          const dy = (pH - dh) / 2;
          pdf!.addImage(jpegDataUrl, "JPEG", dx, dy, dw, dh);
        }

        // Progress: 5% for loading + 90% spread across pages + 5% for finalize
        setProgress(5 + Math.round((pageNum / numPages) * 90));
      }

      setProgressLabel("Finalizing PDF…");
      setProgress(96);

      const outBlob = pdf!.output("blob");
      const url = URL.createObjectURL(outBlob);

      setOutputBlob(outBlob);
      setOutputSize(outBlob.size);
      setOutputUrl(url);
      setProgress(100);
      setProgressLabel("Done!");
      setStatus("done");
    } catch (err) {
      console.error("Compression failed:", err);
      setProgressLabel("Compression failed");
      setStatus("error");
    }
  }, [sourceFile, effectiveQuality, effectiveScale, outputUrl]);

  // ---------------------------------------------------------------------------
  // Download
  // ---------------------------------------------------------------------------

  const handleDownload = useCallback(() => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `${sourceName}_compressed.pdf`;
    a.click();
  }, [outputUrl, sourceName]);

  // ---------------------------------------------------------------------------
  // Derived UI state
  // ---------------------------------------------------------------------------

  const isRunning = status === "parsing" || status === "compressing";
  const reduction = outputSize > 0 ? (sourceSize - outputSize) / sourceSize : 0;
  const reductionPct = Math.round(reduction * 100);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className="flex-1 flex flex-col bg-background"
      data-ocid="pdf_compressor.page"
    >
      {/* Page header */}
      <div className="bg-card border-b border-border px-4 py-5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground">
                PDF Compressor
              </h1>
              <p className="text-sm text-muted-foreground">
                Reduce PDF file size entirely in your browser — nothing leaves
                your device
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* ── Drop zone ── */}
          <Card data-ocid="pdf_compressor.dropzone">
            <CardContent className="p-0">
              <button
                type="button"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    fileInputRef.current?.click();
                }}
                className="group w-full flex flex-col items-center justify-center gap-3 p-10 rounded-lg border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {sourceFile ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground truncate max-w-xs">
                        {sourceFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {formatBytes(sourceSize)} · Click to replace
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/15 transition-smooth">
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-smooth" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">
                        Drop a PDF here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Supports single or multi-page PDFs
                      </p>
                    </div>
                  </>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="sr-only"
                onChange={handleFilePick}
                data-ocid="pdf_compressor.upload_button"
              />
            </CardContent>
          </Card>
          {sourceFile && (
            <Card data-ocid="pdf_compressor.settings_panel">
              <CardContent className="p-5 space-y-5">
                {/* Preset tabs */}
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    Compression Preset
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.key}
                        type="button"
                        disabled={advancedMode}
                        onClick={() => setPreset(p.key)}
                        data-ocid={`pdf_compressor.preset_${p.key}`}
                        className={[
                          "relative rounded-lg border p-3 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          advancedMode
                            ? "opacity-40 cursor-not-allowed border-border"
                            : preset === p.key
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/40 hover:bg-muted/40",
                        ].join(" ")}
                      >
                        <span className="block font-medium text-sm text-foreground">
                          {p.label}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                          {p.description}
                        </span>
                        <Badge
                          variant="secondary"
                          className={[
                            "absolute top-2 right-2 text-[10px] px-1.5 h-4",
                            !advancedMode && preset === p.key
                              ? "bg-primary text-primary-foreground"
                              : "",
                          ].join(" ")}
                        >
                          {p.badge}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="advanced-toggle"
                      className="font-medium text-sm"
                    >
                      Advanced Mode
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Fine-tune quality and render scale
                    </p>
                  </div>
                  <Switch
                    id="advanced-toggle"
                    checked={advancedMode}
                    onCheckedChange={setAdvancedMode}
                    data-ocid="pdf_compressor.advanced_toggle"
                  />
                </div>

                {/* Advanced controls */}
                {advancedMode && (
                  <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/20">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">
                          JPEG Quality
                        </Label>
                        <span
                          className="font-mono text-xs text-primary"
                          data-ocid="pdf_compressor.quality_value"
                        >
                          {Math.round(manualQuality * 100)}%
                        </span>
                      </div>
                      <Slider
                        min={10}
                        max={100}
                        step={1}
                        value={[Math.round(manualQuality * 100)]}
                        onValueChange={([v]) => setManualQuality(v / 100)}
                        data-ocid="pdf_compressor.quality_slider"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>10% (smallest)</span>
                        <span>100% (best)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">
                          Render Scale
                        </Label>
                        <span
                          className="font-mono text-xs text-primary"
                          data-ocid="pdf_compressor.scale_value"
                        >
                          {manualScale.toFixed(2)}×
                        </span>
                      </div>
                      <Slider
                        min={50}
                        max={200}
                        step={5}
                        value={[Math.round(manualScale * 100)]}
                        onValueChange={([v]) => setManualScale(v / 100)}
                        data-ocid="pdf_compressor.scale_slider"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>0.5× (faster)</span>
                        <span>2.0× (sharper)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary line */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <span>
                    Effective quality:{" "}
                    <span className="text-foreground font-medium">
                      {Math.round(effectiveQuality * 100)}%
                    </span>
                  </span>
                  {advancedMode && (
                    <>
                      <span>·</span>
                      <span>
                        Scale:{" "}
                        <span className="text-foreground font-medium">
                          {effectiveScale.toFixed(2)}×
                        </span>
                      </span>
                    </>
                  )}
                </div>

                {/* Compress button */}
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={compress}
                  disabled={isRunning}
                  data-ocid="pdf_compressor.compress_button"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Compressing…
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Compress PDF
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── Progress ── */}
          {isRunning && (
            <Card data-ocid="pdf_compressor.progress_panel">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{progressLabel}</span>
                  <span className="font-mono text-primary font-medium">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {["Parsing PDF", "Rendering pages", "Encoding JPEG"].map(
                    (step, i) => {
                      const stepThreshold = [0, 5, 50][i];
                      const done = progress > stepThreshold + 10;
                      const active = progress >= stepThreshold && !done;
                      return (
                        <div
                          key={step}
                          className={[
                            "flex items-center gap-1.5 text-xs rounded-md px-2 py-1",
                            done
                              ? "text-primary"
                              : active
                                ? "text-foreground"
                                : "text-muted-foreground",
                          ].join(" ")}
                        >
                          {done ? (
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                          ) : active ? (
                            <Loader2 className="w-3 h-3 shrink-0 animate-spin" />
                          ) : (
                            <div className="w-3 h-3 rounded-full border border-border shrink-0" />
                          )}
                          {step}
                        </div>
                      );
                    },
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Skeleton placeholder while running ── */}
          {isRunning && (
            <div className="space-y-2" data-ocid="pdf_compressor.loading_state">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          )}

          {/* ── Error ── */}
          {status === "error" && (
            <Card
              className="border-destructive/40"
              data-ocid="pdf_compressor.error_state"
            >
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive text-sm">
                    Compression failed
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    The PDF could not be processed. It may be password-protected
                    or corrupt. Try a different file.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Results ── */}
          {status === "done" && outputBlob && (
            <Card
              className="border-primary/30"
              data-ocid="pdf_compressor.success_state"
            >
              <CardContent className="p-5 space-y-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <h2 className="font-display font-semibold text-foreground">
                    Compression complete
                  </h2>
                </div>

                {/* Size comparison */}
                <div className="grid grid-cols-3 gap-3">
                  <SizeCard
                    label="Original"
                    value={formatBytes(sourceSize)}
                    sub={`${sourceName}.pdf`}
                    variant="neutral"
                  />
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p
                        className={`font-display text-2xl font-bold ${reductionColor(reduction)}`}
                        data-ocid="pdf_compressor.reduction_pct"
                      >
                        {reductionPct > 0
                          ? `−${reductionPct}%`
                          : `+${Math.abs(reductionPct)}%`}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {reductionPct > 0 ? "reduction" : "increase"}
                      </p>
                    </div>
                  </div>
                  <SizeCard
                    label="Compressed"
                    value={formatBytes(outputSize)}
                    sub={`${sourceName}_compressed.pdf`}
                    variant={reductionPct > 0 ? "success" : "warn"}
                  />
                </div>

                {/* Ratio bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                    <span>Compressed size relative to original</span>
                    <span>
                      {((outputSize / sourceSize) * 100).toFixed(1)}% of
                      original
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(100, (outputSize / sourceSize) * 100).toFixed(1)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Download */}
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleDownload}
                  data-ocid="pdf_compressor.download_button"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download compressed PDF
                </Button>

                {/* Re-compress with different settings */}
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setOutputBlob(null);
                    setOutputSize(0);
                    if (outputUrl) URL.revokeObjectURL(outputUrl);
                    setOutputUrl(null);
                  }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition-smooth flex items-center justify-center gap-1 py-1"
                  data-ocid="pdf_compressor.re_compress_button"
                >
                  <ChevronUp className="w-3 h-3" />
                  Adjust settings &amp; re-compress
                  <ChevronDown className="w-3 h-3" />
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper sub-component
// ---------------------------------------------------------------------------

interface SizeCardProps {
  label: string;
  value: string;
  sub: string;
  variant: "neutral" | "success" | "warn";
}

function SizeCard({ label, value, sub, variant }: SizeCardProps) {
  const variantClass =
    variant === "success"
      ? "bg-primary/10 border-primary/25"
      : variant === "warn"
        ? "bg-accent/10 border-accent/25"
        : "bg-muted/30 border-border";
  return (
    <div className={`rounded-lg border p-3 ${variantClass}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="font-display text-lg font-bold text-foreground mt-0.5">
        {value}
      </p>
      <p className="text-[10px] text-muted-foreground truncate mt-0.5">{sub}</p>
    </div>
  );
}
