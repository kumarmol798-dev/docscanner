import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateDocument } from "@/hooks/useDocuments";
import { useExport } from "@/hooks/useExport";
import { useOcr } from "@/hooks/useOcr";
import { useScanStore } from "@/store/scanStore";
import type { PageRotation } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  FileImage,
  FilePlus,
  Library,
  Loader2,
  Save,
  ScanText,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { PageRotation as BackendPageRotation, ExternalBlob } from "../backend";
import { PageCard } from "../components/PageCard";

function defaultDocName() {
  const d = new Date();
  return `Scan ${d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

function toBackendRotation(rotation: PageRotation): BackendPageRotation {
  switch (rotation) {
    case 0:
      return BackendPageRotation.deg0;
    case 90:
      return BackendPageRotation.deg90;
    case 180:
      return BackendPageRotation.deg180;
    case 270:
      return BackendPageRotation.deg270;
    default:
      return BackendPageRotation.deg0;
  }
}

async function dataUrlToExternalBlob(dataUrl: string): Promise<ExternalBlob> {
  const res = await fetch(dataUrl);
  const arrayBuffer = await res.arrayBuffer();
  return ExternalBlob.fromBytes(new Uint8Array(arrayBuffer));
}

export default function ReviewPage() {
  const {
    pages,
    documentName,
    setDocumentName,
    removePage,
    rotatePage,
    reorderPages,
    clearSession,
  } = useScanStore();
  const navigate = useNavigate();
  const { getState, runOcr } = useOcr();
  const { exportPdf, exportImage, pdfStatus, imgStatus } = useExport();
  const createDocument = useCreateDocument();

  // Set default document name on first load
  useEffect(() => {
    if (!documentName) {
      setDocumentName(defaultDocName());
    }
  }, [documentName, setDocumentName]);

  function rotateCw(id: string, current: PageRotation) {
    rotatePage(id, ((current + 90) % 360) as PageRotation);
  }

  function rotateCcw(id: string, current: PageRotation) {
    rotatePage(id, ((current + 270) % 360) as PageRotation);
  }

  async function handleSave() {
    if (!documentName.trim()) {
      toast.error("Please enter a document name");
      return;
    }
    if (pages.length === 0) {
      toast.error("No pages to save");
      return;
    }
    try {
      const pageInputs = await Promise.all(
        pages.map(async (p) => {
          const blob = await dataUrlToExternalBlob(p.imageDataUrl);
          const ocrState = getState(p.id);
          return {
            rotation: toBackendRotation(p.rotation),
            blob,
            ocrText: ocrState.status === "done" ? ocrState.text : undefined,
          };
        }),
      );
      await createDocument.mutateAsync({
        name: documentName.trim(),
        pages: pageInputs,
      });
      toast.success(`"${documentName}" saved to library`);
      clearSession();
      navigate({ to: "/library" });
    } catch {
      toast.error("Failed to save document. Please try again.");
    }
  }

  function handleExportPdf() {
    if (!documentName.trim()) {
      toast.error("Please enter a document name first");
      return;
    }
    exportPdf(pages, documentName).then(() => {
      if (pdfStatus !== "error") toast.success("PDF downloaded");
    });
  }

  function handleExportImage() {
    if (pages.length === 0) return;
    exportImage(pages[0], documentName).then(() => {
      if (imgStatus !== "error") toast.success("Image downloaded");
    });
  }

  function handleRunOcrAll() {
    for (const page of pages) {
      const state = getState(page.id);
      if (state.status === "idle") {
        runOcr(page.id, page.imageDataUrl);
      }
    }
    toast.info("Running OCR on all pages…");
  }

  // Empty state
  if (pages.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center gap-6 p-8"
        data-ocid="review.empty_state"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mx-auto mb-4">
            <FilePlus className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            No pages yet
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Scan at least one document page before reviewing.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => navigate({ to: "/capture" })}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display"
          data-ocid="review.go_capture_button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go to Capture
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col" data-ocid="review.page">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3 shadow-scan">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/capture" })}
              className="text-muted-foreground hover:text-foreground font-display"
              data-ocid="review.back_button"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Add pages
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-foreground">
                Review
              </span>
              <Badge
                variant="secondary"
                className="bg-primary/15 text-primary text-xs font-mono"
              >
                {pages.length} {pages.length === 1 ? "page" : "pages"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRunOcrAll}
              className="font-display text-xs border-border hover:border-primary/50 hover:text-primary"
              data-ocid="review.ocr_all_button"
            >
              <ScanText className="w-3.5 h-3.5 mr-1.5" />
              OCR All
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportImage}
              disabled={imgStatus === "generating"}
              className="font-display text-xs border-border hover:border-accent/60 hover:text-accent"
              data-ocid="review.export_image_button"
            >
              {imgStatus === "generating" ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <FileImage className="w-3.5 h-3.5 mr-1.5" />
              )}
              Save as JPEG
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleExportPdf}
              disabled={pdfStatus === "generating"}
              className="font-display text-xs border-border hover:border-accent/60 hover:text-accent"
              data-ocid="review.export_pdf_button"
            >
              {pdfStatus === "generating" ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 mr-1.5" />
              )}
              Export PDF
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={createDocument.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-xs shadow-scan"
              data-ocid="review.save_button"
            >
              {createDocument.isPending ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5 mr-1.5" />
              )}
              Save to Library
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6 px-4 py-5 max-w-6xl mx-auto w-full">
        {/* Document name */}
        <div
          className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          data-ocid="review.name_section"
        >
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Library className="w-4 h-4 text-primary" />
            <Label
              htmlFor="doc-name"
              className="font-display text-sm font-semibold text-foreground cursor-pointer"
            >
              Document name
            </Label>
          </div>
          <Input
            id="doc-name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="e.g. Invoice_Oct_2025"
            className="bg-background font-mono text-sm border-input focus-visible:ring-primary max-w-sm"
            data-ocid="review.name_input"
          />
        </div>

        {/* Page list */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-display text-sm font-semibold text-foreground">
              Pages
            </h2>
            <p className="text-xs text-muted-foreground">
              Reorder, rotate, or remove pages before saving
            </p>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            data-ocid="review.pages_list"
          >
            {pages.map((page, i) => (
              <PageCard
                key={page.id}
                page={page}
                index={i}
                total={pages.length}
                ocrState={getState(page.id)}
                onMoveUp={() => reorderPages(i, i - 1)}
                onMoveDown={() => reorderPages(i, i + 1)}
                onRotateCw={() => rotateCw(page.id, page.rotation)}
                onRotateCcw={() => rotateCcw(page.id, page.rotation)}
                onDelete={() => removePage(page.id)}
                onRunOcr={(id) => runOcr(id, page.imageDataUrl)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom action panel */}
      <div
        className="sticky bottom-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border px-4 py-3"
        data-ocid="review.action_panel"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {pdfStatus === "generating" && (
              <div
                className="flex items-center gap-2 text-xs text-muted-foreground"
                data-ocid="review.pdf_loading_state"
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                Generating PDF…
              </div>
            )}
            {pdfStatus === "done" && (
              <span
                className="text-xs text-primary font-display"
                data-ocid="review.pdf_success_state"
              >
                ✓ PDF downloaded
              </span>
            )}
            {pdfStatus === "error" && (
              <span
                className="text-xs text-destructive"
                data-ocid="review.pdf_error_state"
              >
                PDF generation failed — try again
              </span>
            )}
            {imgStatus === "generating" && (
              <div
                className="flex items-center gap-2 text-xs text-muted-foreground"
                data-ocid="review.img_loading_state"
              >
                <Skeleton className="h-2 w-20" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <p className="text-xs text-muted-foreground hidden sm:block">
              {pages.length} page{pages.length !== 1 ? "s" : ""} ready
            </p>
            <Button
              type="button"
              onClick={handleSave}
              disabled={createDocument.isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold shadow-scan"
              data-ocid="review.save_primary_button"
            >
              {createDocument.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save to Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
