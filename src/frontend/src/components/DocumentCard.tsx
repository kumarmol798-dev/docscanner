import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelativeTime } from "@/lib/time";
import type { DocumentSummary } from "@/types";
import { FileText, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface DocumentCardProps {
  doc: DocumentSummary;
  index: number;
  viewMode: "grid" | "list";
  onOpen: (doc: DocumentSummary) => void;
  onRename: (doc: DocumentSummary) => void;
  onDelete: (doc: DocumentSummary) => void;
}

export function DocumentCard({
  doc,
  index,
  viewMode,
  onOpen,
  onRename,
  onDelete,
}: DocumentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (viewMode === "list") {
    return (
      <button
        type="button"
        data-ocid={`library.item.${index}`}
        className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-card/80 transition-smooth cursor-pointer group w-full text-left"
        onClick={() => onOpen(doc)}
        aria-label={`Open ${doc.name}`}
      >
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-display font-semibold text-foreground truncate">
            {doc.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {String(doc.pageCount)} {doc.pageCount === 1n ? "page" : "pages"} ·{" "}
            {formatRelativeTime(doc.updatedAt)}
          </p>
        </div>

        {/* Badge */}
        <Badge
          variant="outline"
          className="hidden sm:flex border-border text-muted-foreground text-xs shrink-0"
        >
          PDF
        </Badge>

        {/* Actions */}
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              data-ocid={`library.item_menu.${index}`}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-smooth shrink-0"
              onClick={(e) => e.stopPropagation()}
              aria-label="Document options"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-popover border-border text-popover-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem
              data-ocid={`library.rename_button.${index}`}
              onClick={() => {
                setMenuOpen(false);
                onRename(doc);
              }}
              className="cursor-pointer"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              data-ocid={`library.delete_button.${index}`}
              onClick={() => {
                setMenuOpen(false);
                onDelete(doc);
              }}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </button>
    );
  }

  // Grid mode
  return (
    <button
      type="button"
      data-ocid={`library.item.${index}`}
      className="relative group rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-scan transition-smooth cursor-pointer overflow-hidden w-full text-left"
      onClick={() => onOpen(doc)}
      aria-label={`Open ${doc.name}`}
    >
      {/* Thumbnail area */}
      <div className="h-40 bg-secondary flex items-center justify-center relative border-b border-border">
        <FileText className="w-14 h-14 text-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
        <Badge
          variant="outline"
          className="absolute top-2 right-2 border-border text-muted-foreground text-xs"
        >
          {String(doc.pageCount)}p
        </Badge>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-sm font-display font-semibold text-foreground truncate">
          {doc.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {formatRelativeTime(doc.updatedAt)}
        </p>
      </div>

      {/* Hover actions */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-smooth">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              data-ocid={`library.item_menu.${index}`}
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-card/80 backdrop-blur-sm text-foreground hover:bg-card border border-border"
              onClick={(e) => e.stopPropagation()}
              aria-label="Document options"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-popover border-border text-popover-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuItem
              data-ocid={`library.rename_button.${index}`}
              onClick={() => {
                setMenuOpen(false);
                onRename(doc);
              }}
              className="cursor-pointer"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              data-ocid={`library.delete_button.${index}`}
              onClick={() => {
                setMenuOpen(false);
                onDelete(doc);
              }}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </button>
  );
}
