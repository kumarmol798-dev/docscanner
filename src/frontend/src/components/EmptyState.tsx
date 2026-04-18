import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { Camera, FileSearch } from "lucide-react";

interface EmptyStateProps {
  query?: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  const router = useRouter();

  if (query) {
    return (
      <div
        data-ocid="library.empty_state"
        className="flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary mb-6">
          <FileSearch className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          No results for "{query}"
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Try a different search term or browse all your documents.
        </p>
      </div>
    );
  }

  return (
    <div
      data-ocid="library.empty_state"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-28 h-36 rounded-xl bg-secondary border border-border flex items-center justify-center shadow-scan rotate-[-6deg] absolute -left-10 top-2 opacity-50">
          <div className="space-y-2 p-4 w-full">
            <div className="h-1.5 bg-muted rounded-full w-full" />
            <div className="h-1.5 bg-muted rounded-full w-3/4" />
            <div className="h-1.5 bg-muted rounded-full w-5/6" />
            <div className="h-1.5 bg-muted rounded-full w-2/3" />
          </div>
        </div>
        <div className="w-28 h-36 rounded-xl bg-card border border-border flex items-center justify-center shadow-scan relative z-10 rotate-[3deg]">
          <div className="space-y-2 p-4 w-full">
            <div className="h-1.5 bg-primary/40 rounded-full w-full" />
            <div className="h-1.5 bg-muted rounded-full w-3/4" />
            <div className="h-1.5 bg-muted rounded-full w-5/6" />
            <div className="h-1.5 bg-muted rounded-full w-2/3" />
            <div className="h-6 bg-primary/20 rounded mt-3 w-full" />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-display font-bold text-foreground mb-3 mt-4">
        No documents yet
      </h3>
      <p className="text-muted-foreground text-base max-w-xs mb-8">
        Scan your first document and it will appear here for easy access
        anywhere.
      </p>
      <Button
        data-ocid="library.start_scanning_button"
        onClick={() => router.navigate({ to: "/capture" })}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-2.5 h-auto rounded-lg transition-smooth"
        size="lg"
      >
        <Camera className="w-5 h-5 mr-2" />
        Start Scanning
      </Button>
    </div>
  );
}
