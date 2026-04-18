import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDocument } from "@/hooks/useDocuments";
import type { DocumentSummary } from "@/types";
import { Download, FileText, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DocumentDetailProps {
  doc: DocumentSummary | null;
  open: boolean;
  onClose: () => void;
}

function PageThumbnail({
  page,
  index,
}: {
  page: { imageUrl: string; rotation: number };
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative rounded-lg overflow-hidden bg-secondary border border-border aspect-[3/4]">
      {!loaded && !error && (
        <Skeleton className="absolute inset-0 rounded-lg" />
      )}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <FileText className="w-8 h-8 mb-1 opacity-40" />
          <span className="text-xs">Page {index + 1}</span>
        </div>
      ) : (
        <img
          src={page.imageUrl}
          alt={`Page ${index + 1}`}
          className="w-full h-full object-cover"
          style={{ transform: `rotate(${page.rotation}deg)` }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
        <span className="bg-background/80 backdrop-blur-sm text-xs text-muted-foreground rounded px-1.5 py-0.5">
          {index + 1}
        </span>
      </div>
    </div>
  );
}

export function DocumentDetail({ doc, open, onClose }: DocumentDetailProps) {
  const { data: fullDoc, isLoading } = useGetDocument(
    open && doc ? doc.id : null,
  );
  const [downloading, setDownloading] = useState(false);

  // Reset download state when doc changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on doc id change
  useEffect(() => {
    setDownloading(false);
  }, [doc?.id]);

  const handleDownload = async () => {
    if (!fullDoc) return;
    setDownloading(true);
    try {
      if (fullDoc.pages.length > 0) {
        // Download first page as representative image
        const url = fullDoc.pages[0].blob.getDirectURL();
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fullDoc.name}.jpg`;
        a.click();
      }
    } finally {
      setDownloading(false);
    }
  };

  // Map backend pages to display format
  const displayPages =
    fullDoc?.pages.map((p) => ({
      imageUrl: p.blob.getDirectURL(),
      rotation:
        p.rotation === "deg90"
          ? 90
          : p.rotation === "deg180"
            ? 180
            : p.rotation === "deg270"
              ? 270
              : 0,
    })) ?? [];

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        data-ocid="document.dialog"
        side="right"
        className="w-full sm:max-w-xl bg-card border-l border-border text-foreground p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-foreground font-display text-lg truncate">
                {doc?.name ?? "Document"}
              </SheetTitle>
              {doc && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {String(doc.pageCount)}{" "}
                  {doc.pageCount === 1n ? "page" : "pages"}
                </p>
              )}
            </div>
            <Button
              data-ocid="document.close_button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0 -mr-1 mt-0.5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Pages grid */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
              ))}
            </div>
          ) : displayPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <FileText className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">No pages available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {displayPages.map((page, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: pages have no stable ID from backend
                <PageThumbnail key={i} page={page} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-border flex-shrink-0 flex items-center gap-3">
          <Button
            data-ocid="document.download_button"
            onClick={handleDownload}
            disabled={downloading || isLoading || !fullDoc}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-10 rounded-lg transition-smooth"
          >
            {downloading ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Preparing…
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
