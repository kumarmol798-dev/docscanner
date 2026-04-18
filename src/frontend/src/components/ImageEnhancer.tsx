import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ScanPage } from "../types";

type FilterType = "original" | "bw" | "greyscale" | "enhanced";

interface FilterOption {
  id: FilterType;
  label: string;
}

const FILTERS: FilterOption[] = [
  { id: "original", label: "Original" },
  { id: "bw", label: "B&W" },
  { id: "greyscale", label: "Greyscale" },
  { id: "enhanced", label: "Enhanced" },
];

interface ImageEnhancerProps {
  page: ScanPage;
  onConfirm: (updatedPage: ScanPage) => void;
  onDiscard: () => void;
}

export function ImageEnhancer({
  page,
  onConfirm,
  onDiscard,
}: ImageEnhancerProps) {
  const [filter, setFilter] = useState<FilterType>("original");
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);

  const applyFilter = useCallback(() => {
    const canvas = canvasRef.current;
    const preview = previewRef.current;
    if (!canvas || !preview) return;
    const ctx = canvas.getContext("2d");
    const pctx = preview.getContext("2d");
    if (!ctx || !pctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      preview.width = img.width;
      preview.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      const b = (brightness - 50) * 2; // -100 to +100
      const c = (contrast - 50) / 50; // -1 to +1

      for (let i = 0; i < d.length; i += 4) {
        let r = d[i];
        let g = d[i + 1];
        let bl = d[i + 2];

        // Apply filter
        if (filter === "bw") {
          const lum = 0.299 * r + 0.587 * g + 0.114 * bl;
          r = g = bl = lum > 128 ? 255 : 0;
        } else if (filter === "greyscale") {
          const grey = 0.299 * r + 0.587 * g + 0.114 * bl;
          r = g = bl = grey;
        } else if (filter === "enhanced") {
          // Boost contrast and slight warm tint
          const grey = 0.299 * r + 0.587 * g + 0.114 * bl;
          const boost = grey > 128 ? 1.15 : 0.85;
          r = Math.min(255, r * boost * 1.02);
          g = Math.min(255, g * boost);
          bl = Math.min(255, bl * boost * 0.96);
        }

        // Brightness
        r = Math.min(255, Math.max(0, r + b));
        g = Math.min(255, Math.max(0, g + b));
        bl = Math.min(255, Math.max(0, bl + b));

        // Contrast
        r = Math.min(255, Math.max(0, (r - 128) * (1 + c) + 128));
        g = Math.min(255, Math.max(0, (g - 128) * (1 + c) + 128));
        bl = Math.min(255, Math.max(0, (bl - 128) * (1 + c) + 128));

        d[i] = r;
        d[i + 1] = g;
        d[i + 2] = bl;
      }

      pctx.putImageData(imageData, 0, 0);
    };
    img.src = page.imageDataUrl;
  }, [page.imageDataUrl, filter, brightness, contrast]);

  useEffect(() => {
    setProcessing(true);
    const t = setTimeout(() => {
      applyFilter();
      setProcessing(false);
    }, 120);
    return () => clearTimeout(t);
  }, [applyFilter]);

  function handleConfirm() {
    const preview = previewRef.current;
    if (!preview) {
      onConfirm(page);
      return;
    }
    const dataUrl = preview.toDataURL("image/jpeg", 0.92);
    onConfirm({ ...page, imageDataUrl: dataUrl });
  }

  return (
    <div className="flex flex-col h-full gap-4" data-ocid="enhancer.panel">
      {/* Filter selector */}
      <div className="space-y-2">
        <Label className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide">
          Filter
        </Label>
        <div className="flex gap-2 flex-wrap" data-ocid="enhancer.filter_tabs">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              data-ocid={`enhancer.filter.${f.id}`}
              className={`px-3 py-1.5 rounded-md text-sm font-display font-medium transition-scan border ${
                filter === f.id
                  ? "bg-primary text-primary-foreground border-primary/50 shadow-scan"
                  : "bg-muted text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-xs font-display text-muted-foreground">
              Brightness
            </Label>
            <span className="text-xs text-muted-foreground font-mono">
              {brightness}
            </span>
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[brightness]}
            onValueChange={([v]) => setBrightness(v)}
            data-ocid="enhancer.brightness_slider"
            className="[&_.range-thumb]:bg-primary [&_[data-slot=range]]:bg-primary"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-xs font-display text-muted-foreground">
              Contrast
            </Label>
            <span className="text-xs text-muted-foreground font-mono">
              {contrast}
            </span>
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[contrast]}
            onValueChange={([v]) => setContrast(v)}
            data-ocid="enhancer.contrast_slider"
            className="[&_.range-thumb]:bg-primary [&_[data-slot=range]]:bg-primary"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 relative rounded-lg overflow-hidden bg-muted/40 border border-border min-h-0 flex items-center justify-center">
        {processing && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-card/70 z-10"
            data-ocid="enhancer.loading_state"
          >
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground font-display">
                Processing…
              </span>
            </div>
          </div>
        )}
        <canvas
          ref={previewRef}
          className="max-w-full max-h-full object-contain rounded"
          aria-label="Enhanced preview"
        />
        <canvas ref={canvasRef} className="hidden" />
        {filter !== "original" && !processing && (
          <Badge className="absolute top-2 right-2 bg-primary/20 text-primary border-primary/30 text-xs">
            {FILTERS.find((f) => f.id === filter)?.label}
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onDiscard}
          className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10 font-display transition-scan"
          data-ocid="enhancer.discard_button"
        >
          <X className="w-4 h-4 mr-1.5" />
          Retake
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={processing}
          className="flex-2 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold transition-scan flex-1"
          data-ocid="enhancer.confirm_button"
        >
          <Check className="w-4 h-4 mr-1.5" />
          Add Page
        </Button>
      </div>
    </div>
  );
}
