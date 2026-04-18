import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search documents…",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex items-center w-full">
      <Search
        className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        data-ocid="library.search_input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-1 h-10 rounded-lg"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="library.search_clear_button"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
