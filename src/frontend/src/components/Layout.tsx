import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-card border-t border-border py-3 px-4">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
      <Toaster richColors position="top-right" />
    </div>
  );
}
