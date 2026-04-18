import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, FileText, X } from "lucide-react";
import type { ScanPage } from "../types";

interface CapturePageStripProps {
  pages: ScanPage[];
  onRemove: (id: string) => void;
}

export function CapturePageStrip({ pages, onRemove }: CapturePageStripProps) {
  const navigate = useNavigate();

  if (pages.length === 0) {
    return (
      <div
        className="h-28 flex items-center justify-center border-t border-border bg-card/60"
        data-ocid="capture.strip.empty_state"
      >
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <FileText className="w-4 h-4" />
          <span className="font-display">
            Pages you capture will appear here
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="border-t border-border bg-card/60 flex-shrink-0"
      data-ocid="capture.strip"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wide">
          {pages.length} page{pages.length !== 1 ? "s" : ""} captured
        </span>
        <Button
          type="button"
          onClick={() => navigate({ to: "/review" })}
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold text-sm transition-scan h-8 px-3"
          data-ocid="capture.next_review_button"
        >
          Review
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
      <ScrollArea className="w-full" data-ocid="capture.strip.scroll">
        <div className="flex gap-2 px-4 pb-3">
          {pages.map((page, i) => (
            <div
              key={page.id}
              className="relative flex-shrink-0 w-16 group"
              data-ocid={`capture.strip.item.${i + 1}`}
            >
              <div className="aspect-[3/4] rounded-md overflow-hidden border border-border shadow-scan bg-muted">
                <img
                  src={page.imageDataUrl}
                  alt={`Page ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="block text-center text-[10px] text-muted-foreground mt-0.5 font-mono">
                {i + 1}
              </span>
              <button
                type="button"
                aria-label={`Remove page ${i + 1}`}
                onClick={() => onRemove(page.id)}
                data-ocid={`capture.strip.remove.${i + 1}`}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-scan shadow-scan hover:scale-110"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
