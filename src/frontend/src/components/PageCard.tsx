import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { OcrState } from "@/hooks/useOcr";
import type { ScanPage } from "@/types";
import { ArrowDown, ArrowUp, RotateCcw, RotateCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { OcrPanel } from "./OcrPanel";

interface PageCardProps {
  page: ScanPage;
  index: number;
  total: number;
  ocrState: OcrState;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRotateCw: () => void;
  onRotateCcw: () => void;
  onDelete: () => void;
  onRunOcr: (pageId: string) => void;
}

export function PageCard({
  page,
  index,
  total,
  ocrState,
  onMoveUp,
  onMoveDown,
  onRotateCw,
  onRotateCcw,
  onDelete,
  onRunOcr,
}: PageCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <div
        className="bg-card border border-border rounded-lg overflow-hidden flex flex-col shadow-scan transition-smooth hover:border-primary/40 hover:shadow-scan"
        data-ocid={`review.page_card.${index + 1}`}
      >
        {/* Page image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/30 group">
          <img
            src={page.imageDataUrl}
            alt={`Page ${index + 1}`}
            className="w-full h-full object-contain transition-scan"
            style={{ transform: `rotate(${page.rotation}deg)` }}
            draggable={false}
          />
          {/* Page number badge */}
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="bg-background/80 text-foreground backdrop-blur-sm text-xs font-mono px-1.5"
            >
              {index + 1}
            </Badge>
          </div>

          {/* Hover overlay with quick rotate */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-scan pointer-events-none" />
        </div>

        {/* Controls bar */}
        <div className="px-2 py-1.5 bg-card flex items-center justify-between gap-1 border-t border-border/60">
          {/* Reorder */}
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={index === 0}
              onClick={onMoveUp}
              aria-label="Move page up"
              data-ocid={`review.move_up.${index + 1}`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={index === total - 1}
              onClick={onMoveDown}
              aria-label="Move page down"
              data-ocid={`review.move_down.${index + 1}`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Rotate */}
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={onRotateCcw}
              aria-label="Rotate counterclockwise"
              data-ocid={`review.rotate_ccw.${index + 1}`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={onRotateCw}
              aria-label="Rotate clockwise"
              data-ocid={`review.rotate_cw.${index + 1}`}
            >
              <RotateCw className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Delete */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => setConfirmOpen(true)}
            aria-label="Delete page"
            data-ocid={`review.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* OCR panel */}
        <OcrPanel
          pageId={page.id}
          pageIndex={index + 1}
          state={ocrState}
          onRunOcr={onRunOcr}
        />
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          className="bg-card border-border max-w-sm"
          data-ocid={`review.delete_dialog.${index + 1}`}
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Delete page {index + 1}?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This page will be removed from the current scan session. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              data-ocid={`review.delete_cancel.${index + 1}`}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onDelete();
                setConfirmOpen(false);
              }}
              data-ocid={`review.delete_confirm.${index + 1}`}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
