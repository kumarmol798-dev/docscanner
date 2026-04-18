import { ConfirmDialog } from "@/components/ConfirmDialog";
import { DocumentCard } from "@/components/DocumentCard";
import { DocumentDetail } from "@/components/DocumentDetail";
import { EmptyState } from "@/components/EmptyState";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteDocument,
  useDocuments,
  useUpdateDocumentName,
} from "@/hooks/useDocuments";
import type { DocumentSummary } from "@/types";
import { useRouter } from "@tanstack/react-router";
import { Camera, LayoutGrid, LayoutList } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const SAMPLE_DOCS: DocumentSummary[] = [
  {
    id: 1n,
    name: "Invoice_001.pdf",
    pageCount: 2n,
    createdAt: BigInt(Date.now() - 2 * 60 * 60 * 1000) * 1_000_000n,
    updatedAt: BigInt(Date.now() - 2 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    id: 2n,
    name: "Contract_Aug.pdf",
    pageCount: 5n,
    createdAt: BigInt(Date.now() - 26 * 60 * 60 * 1000) * 1_000_000n,
    updatedAt: BigInt(Date.now() - 26 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    id: 3n,
    name: "Contract_002.pdf",
    pageCount: 3n,
    createdAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * 1_000_000n,
    updatedAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    id: 4n,
    name: "Invoice_002.pdf",
    pageCount: 1n,
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * 1_000_000n,
    updatedAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    id: 5n,
    name: "Tax_Return_2025.pdf",
    pageCount: 8n,
    createdAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * 1_000_000n,
    updatedAt: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
  {
    id: 6n,
    name: "NDA_Signed.pdf",
    pageCount: 4n,
    createdAt: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000) * 1_000_000n,
    updatedAt: BigInt(Date.now() - 21 * 24 * 60 * 60 * 1000) * 1_000_000n,
  },
];

export default function LibraryPage() {
  const router = useRouter();
  const { data: backendDocs, isLoading } = useDocuments();
  const deleteMutation = useDeleteDocument();
  const renameMutation = useUpdateDocumentName();

  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (v: string) => {
    setSearchInput(v);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setDebouncedSearch(v), 280);
  };

  // Detail drawer
  const [selectedDoc, setSelectedDoc] = useState<DocumentSummary | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<DocumentSummary | null>(
    null,
  );
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Rename dialog
  const [renameTarget, setRenameTarget] = useState<DocumentSummary | null>(
    null,
  );
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameName, setRenameName] = useState("");

  const docs =
    backendDocs && backendDocs.length > 0 ? backendDocs : SAMPLE_DOCS;

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return docs;
    const q = debouncedSearch.toLowerCase();
    return docs.filter((d) => d.name.toLowerCase().includes(q));
  }, [docs, debouncedSearch]);

  const handleOpen = (doc: DocumentSummary) => {
    setSelectedDoc(doc);
    setDetailOpen(true);
  };

  const handleRename = (doc: DocumentSummary) => {
    setRenameTarget(doc);
    setRenameName(doc.name);
    setRenameOpen(true);
  };

  const handleDelete = (doc: DocumentSummary) => {
    setDeleteTarget(doc);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`"${deleteTarget.name}" deleted`);
    } catch {
      toast.error("Failed to delete document");
    }
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  const confirmRename = async () => {
    if (!renameTarget || !renameName.trim()) return;
    try {
      await renameMutation.mutateAsync({
        id: renameTarget.id,
        name: renameName.trim(),
      });
      toast.success("Document renamed");
    } catch {
      toast.error("Failed to rename document");
    }
    setRenameOpen(false);
    setRenameTarget(null);
  };

  return (
    <div
      data-ocid="library.page"
      className="flex flex-col min-h-full bg-background relative"
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border px-4 sm:px-6 py-4 shadow-scan">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <SearchBar
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search documents…"
              />
            </div>
            {/* View toggle */}
            <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 shrink-0">
              <Button
                data-ocid="library.grid_view_toggle"
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md transition-smooth ${
                  viewMode === "grid"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                data-ocid="library.list_view_toggle"
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md transition-smooth ${
                  viewMode === "list"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {!isLoading && (
            <p className="text-xs text-muted-foreground mt-2">
              {filtered.length}{" "}
              {filtered.length === 1 ? "document" : "documents"}
              {debouncedSearch ? ` matching "${debouncedSearch}"` : ""}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6">
        {isLoading ? (
          <div
            data-ocid="library.loading_state"
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-3"
            }
          >
            {Array.from({ length: 8 }, (_, i) => i).map((i) =>
              viewMode === "grid" ? (
                <div key={i} className="rounded-xl overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ) : (
                <Skeleton key={i} className="h-[72px] w-full rounded-xl" />
              ),
            )}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState query={debouncedSearch || undefined} />
        ) : (
          <div
            data-ocid="library.list"
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                : "space-y-3"
            }
          >
            {filtered.map((doc, i) => (
              <DocumentCard
                key={String(doc.id)}
                doc={doc}
                index={i + 1}
                viewMode={viewMode}
                onOpen={handleOpen}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        type="button"
        data-ocid="library.new_scan_button"
        onClick={() => router.navigate({ to: "/capture" })}
        aria-label="New scan"
        className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-scan flex items-center justify-center hover:bg-primary/90 transition-smooth active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Camera className="h-6 w-6" />
      </button>

      {/* Detail drawer */}
      <DocumentDetail
        doc={selectedDoc}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete document"
        description={`"${deleteTarget?.name}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={confirmDelete}
      />

      {/* Rename inline dialog */}
      {renameOpen && (
        <div
          data-ocid="rename.dialog"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <button
            type="button"
            aria-label="Close rename dialog"
            className="absolute inset-0 bg-background/60 backdrop-blur-sm w-full h-full cursor-default"
            onClick={() => setRenameOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setRenameOpen(false)}
          />
          <div className="relative z-10 bg-card border border-border rounded-2xl shadow-scan p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Rename document
            </h2>
            <Input
              data-ocid="rename.input"
              value={renameName}
              onChange={(e) => setRenameName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmRename()}
              placeholder="Document name"
              autoFocus
              className="bg-secondary border-input text-foreground mb-4"
            />
            <div className="flex gap-3 justify-end">
              <Button
                data-ocid="rename.cancel_button"
                variant="outline"
                onClick={() => setRenameOpen(false)}
                className="border-border text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                data-ocid="rename.save_button"
                onClick={confirmRename}
                disabled={
                  !renameName.trim() || renameName.trim() === renameTarget?.name
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
