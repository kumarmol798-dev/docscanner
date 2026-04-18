import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { OcrState } from "@/hooks/useOcr";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  FileText,
  ScanText,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OcrPanelProps {
  pageId: string;
  pageIndex: number;
  state: OcrState;
  onRunOcr: (pageId: string) => void;
}

export function OcrPanel({
  pageId,
  pageIndex,
  state,
  onRunOcr,
}: OcrPanelProps) {
  const [expanded, setExpanded] = useState(false);

  function handleCopy() {
    if (!state.text) return;
    navigator.clipboard.writeText(state.text).then(() => {
      toast.success("Text copied to clipboard");
    });
  }

  return (
    <div
      className="border-t border-border bg-background/40 rounded-b-lg"
      data-ocid={`review.ocr_panel.${pageIndex}`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-3 py-2 gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <FileText className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <span className="text-xs font-display font-medium text-muted-foreground truncate">
            OCR
          </span>
          {state.status === "done" && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1 py-0 h-4 bg-primary/15 text-primary flex-shrink-0"
            >
              {state.confidence}%
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {state.status === "idle" && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 text-xs px-2 text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => onRunOcr(pageId)}
              data-ocid={`review.ocr_run.${pageIndex}`}
            >
              <ScanText className="w-3 h-3 mr-1" />
              Extract
            </Button>
          )}
          {state.status === "loading" && (
            <span
              className="text-xs text-muted-foreground animate-pulse"
              data-ocid={`review.ocr_loading.${pageIndex}`}
            >
              Scanning…
            </span>
          )}
          {state.status === "error" && (
            <span
              className="text-xs text-destructive flex items-center gap-1"
              data-ocid={`review.ocr_error.${pageIndex}`}
            >
              <AlertCircle className="w-3 h-3" />
              Failed
            </span>
          )}
          {state.status === "done" && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCopy}
                aria-label="Copy extracted text"
                data-ocid={`review.ocr_copy.${pageIndex}`}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setExpanded((x) => !x)}
                aria-label={expanded ? "Collapse OCR text" : "Expand OCR text"}
                data-ocid={`review.ocr_toggle.${pageIndex}`}
              >
                {expanded ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Loading skeleton */}
      {state.status === "loading" && (
        <div
          className="px-3 pb-3 space-y-1.5"
          data-ocid={`review.ocr_skeleton.${pageIndex}`}
        >
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-4/5" />
          <Skeleton className="h-2 w-3/5" />
        </div>
      )}

      {/* Text panel */}
      {state.status === "done" && expanded && (
        <div className="px-3 pb-3" data-ocid={`review.ocr_text.${pageIndex}`}>
          <pre className="text-xs font-mono text-foreground/80 leading-relaxed whitespace-pre-wrap break-words max-h-40 overflow-y-auto bg-secondary/40 rounded p-2 border border-border/50 scrollbar-thin">
            {state.text || (
              <span className="text-muted-foreground italic">
                No text detected
              </span>
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
