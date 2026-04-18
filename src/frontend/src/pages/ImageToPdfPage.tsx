import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { jsPDF } from "jspdf";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Download,
  FileImage,
  GripVertical,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

type PageSize = "a4" | "letter" | "fit";
type Orientation = "portrait" | "landscape";

interface ImageItem {
  id: string;
  file: File;
  dataUrl: string;
  name: string;
}

const PAGE_SIZES: { value: PageSize; label: string }[] = [
  { value: "a4", label: "A4 (210 × 297 mm)" },
  { value: "letter", label: "Letter (8.5 × 11 in)" },
  { value: "fit", label: "Fit to Image" },
];

const PAGE_DIMS: Record<PageSize, { w: number; h: number }> = {
  a4: { w: 595.28, h: 841.89 },
  letter: { w: 612, h: 792 },
  fit: { w: 0, h: 0 },
};

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState(20);
  const [progress, setProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const readFileAsDataUrl = useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }),
    [],
  );

  const addFiles = useCallback(
    async (files: File[]) => {
      const valid = files.filter((f) =>
        ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      );
      const items = await Promise.all(
        valid.map(async (file) => ({
          id: `${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          dataUrl: await readFileAsDataUrl(file),
        })),
      );
      setImages((prev) => [...prev, ...items]);
      setPdfBlob(null);
    },
    [readFileAsDataUrl],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setPdfBlob(null);
  };

  const moveImage = (from: number, to: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setPdfBlob(null);
  };

  const handleItemDragStart = (idx: number) => setDragIndex(idx);
  const handleItemDragEnter = (idx: number) => setDragOverIndex(idx);
  const handleItemDragEnd = () => {
    if (
      dragIndex !== null &&
      dragOverIndex !== null &&
      dragIndex !== dragOverIndex
    ) {
      moveImage(dragIndex, dragOverIndex);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const loadImage = (dataUrl: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataUrl;
    });

  const convertToPdf = async () => {
    if (!images.length) return;
    setIsConverting(true);
    setProgress(0);
    setPdfBlob(null);

    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      hotfixes: ["px_scaling"],
    });
    doc.deletePage(1);

    for (let i = 0; i < images.length; i++) {
      const img = await loadImage(images[i].dataUrl);
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      let pageW: number;
      let pageH: number;

      if (pageSize === "fit") {
        pageW = imgW;
        pageH = imgH;
      } else {
        const dims = PAGE_DIMS[pageSize];
        pageW = orientation === "portrait" ? dims.w : dims.h;
        pageH = orientation === "portrait" ? dims.h : dims.w;
      }

      doc.addPage([pageW, pageH], "p");

      const availW = pageW - margin * 2;
      const availH = pageH - margin * 2;
      const scaleX = availW / imgW;
      const scaleY = availH / imgH;
      const scale = Math.min(scaleX, scaleY, 1);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const x = margin + (availW - drawW) / 2;
      const y = margin + (availH - drawH) / 2;

      const ext = images[i].file.type === "image/png" ? "PNG" : "JPEG";
      doc.addImage(images[i].dataUrl, ext, x, y, drawW, drawH);

      setProgress(Math.round(((i + 1) / images.length) * 100));
    }

    const blob = doc.output("blob");
    setPdfBlob(blob);
    setIsConverting(false);
  };

  const downloadPdf = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const isEmpty = images.length === 0;

  return (
    <div className="flex-1 flex flex-col bg-background min-h-0">
      {/* Page header */}
      <div className="bg-card border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
              <FileImage className="w-5 h-5 text-primary" />
              Image to PDF
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Convert JPG, PNG, or WebP images into a single PDF — fully
              client-side
            </p>
          </div>
          {images.length > 0 && (
            <Badge variant="secondary" className="font-mono text-xs">
              {images.length} {images.length === 1 ? "image" : "images"}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
          {/* Drop zone */}
          <button
            type="button"
            data-ocid="image_to_pdf.dropzone"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                fileInputRef.current?.click();
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer transition-smooth hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-foreground font-medium">
              Drop images here or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              JPG, PNG, WebP supported · Multiple files at once
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleFileInput}
              data-ocid="image_to_pdf.upload_button"
            />
          </button>

          {/* Image grid */}
          {!isEmpty && (
            <div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Images · drag to reorder
              </h2>
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                data-ocid="image_to_pdf.list"
              >
                {images.map((img, idx) => (
                  <Card
                    key={img.id}
                    draggable
                    onDragStart={() => handleItemDragStart(idx)}
                    onDragEnter={() => handleItemDragEnter(idx)}
                    onDragEnd={handleItemDragEnd}
                    data-ocid={`image_to_pdf.item.${idx + 1}`}
                    className={`relative group overflow-hidden transition-smooth cursor-grab active:cursor-grabbing ${
                      dragOverIndex === idx
                        ? "ring-2 ring-primary scale-95"
                        : ""
                    }`}
                  >
                    <div className="aspect-[3/4] bg-muted overflow-hidden">
                      <img
                        src={img.dataUrl}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Overlay controls */}
                    <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-1 p-2">
                      <span className="text-xs text-foreground font-medium text-center truncate w-full px-1 text-center">
                        {img.name}
                      </span>
                      <div className="flex gap-1 mt-1">
                        <button
                          type="button"
                          onClick={() => moveImage(idx, Math.max(0, idx - 1))}
                          disabled={idx === 0}
                          aria-label="Move up"
                          data-ocid={`image_to_pdf.item.${idx + 1}.move_up`}
                          className="p-1 rounded bg-card hover:bg-secondary disabled:opacity-30 transition-colors"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            moveImage(idx, Math.min(images.length - 1, idx + 1))
                          }
                          disabled={idx === images.length - 1}
                          aria-label="Move down"
                          data-ocid={`image_to_pdf.item.${idx + 1}.move_down`}
                          className="p-1 rounded bg-card hover:bg-secondary disabled:opacity-30 transition-colors"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          aria-label="Remove image"
                          data-ocid={`image_to_pdf.delete_button.${idx + 1}`}
                          className="p-1 rounded bg-destructive/20 hover:bg-destructive/40 transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </div>
                    </div>

                    {/* Page number badge */}
                    <div className="absolute top-1.5 left-1.5 bg-background/80 rounded px-1.5 py-0.5 text-xs font-mono text-foreground">
                      {idx + 1}
                    </div>
                    <div className="absolute top-1.5 right-1.5 text-muted-foreground">
                      <GripVertical className="w-3.5 h-3.5" />
                    </div>
                  </Card>
                ))}

                {/* Add more */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  data-ocid="image_to_pdf.add_more_button"
                  className="aspect-[3/4] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/60 hover:text-primary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-xs">Add more</span>
                </button>
              </div>
            </div>
          )}

          {/* Settings + convert */}
          {!isEmpty && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* PDF settings */}
              <Card className="p-5 space-y-5 bg-card">
                <h2 className="font-display font-semibold text-foreground">
                  PDF Settings
                </h2>

                {/* Page size */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Page Size
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {PAGE_SIZES.map((ps) => (
                      <button
                        type="button"
                        key={ps.value}
                        data-ocid={`image_to_pdf.page_size.${ps.value}`}
                        onClick={() => {
                          setPageSize(ps.value);
                          setPdfBlob(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-smooth ${
                          pageSize === ps.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border text-foreground hover:bg-secondary"
                        }`}
                      >
                        {ps.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orientation */}
                {pageSize !== "fit" && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Orientation
                    </Label>
                    <div className="flex gap-2">
                      {(["portrait", "landscape"] as Orientation[]).map((o) => (
                        <button
                          type="button"
                          key={o}
                          data-ocid={`image_to_pdf.orientation.${o}`}
                          onClick={() => {
                            setOrientation(o);
                            setPdfBlob(null);
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-sm font-medium border capitalize transition-smooth ${
                            orientation === o
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card border-border text-foreground hover:bg-secondary"
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Margin */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-sm text-muted-foreground">
                      Margin
                    </Label>
                    <span className="text-xs font-mono text-primary">
                      {margin} pt
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={72}
                    step={4}
                    value={[margin]}
                    onValueChange={([v]) => {
                      setMargin(v);
                      setPdfBlob(null);
                    }}
                    data-ocid="image_to_pdf.margin_slider"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>None</span>
                    <span>Wide (72 pt)</span>
                  </div>
                </div>
              </Card>

              {/* Convert & download */}
              <Card className="p-5 flex flex-col justify-between bg-card">
                <div className="space-y-3">
                  <h2 className="font-display font-semibold text-foreground">
                    Export
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {images.length} {images.length === 1 ? "page" : "pages"} ·{" "}
                    {pageSize.toUpperCase()}
                    {pageSize !== "fit" && ` · ${orientation}`}
                    {margin > 0 && ` · ${margin} pt margin`}
                  </p>
                </div>

                <div className="space-y-3 mt-6">
                  {/* Progress */}
                  {isConverting && (
                    <div
                      className="space-y-1.5"
                      data-ocid="image_to_pdf.loading_state"
                    >
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Generating PDF…</span>
                        <span className="font-mono">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {pdfBlob && !isConverting && (
                    <div
                      className="flex items-center gap-2 text-sm text-primary"
                      data-ocid="image_to_pdf.success_state"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        PDF ready · {(pdfBlob.size / 1024).toFixed(0)} KB
                      </span>
                    </div>
                  )}

                  <Button
                    onClick={convertToPdf}
                    disabled={isConverting || images.length === 0}
                    data-ocid="image_to_pdf.convert_button"
                    className="w-full"
                    size="lg"
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Converting…
                      </>
                    ) : (
                      <>
                        <FileImage className="w-4 h-4 mr-2" />
                        Convert to PDF
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={downloadPdf}
                    disabled={!pdfBlob}
                    variant="outline"
                    data-ocid="image_to_pdf.download_button"
                    className="w-full"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Empty state */}
          {isEmpty && (
            <div
              className="text-center py-16 space-y-4"
              data-ocid="image_to_pdf.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <FileImage className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground text-lg">
                  No images yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload some images above to get started. Supports JPG, PNG,
                  and WebP.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
