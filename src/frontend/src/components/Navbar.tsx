import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useScanStore } from "@/store/scanStore";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Eye,
  FileImage,
  FileOutput,
  Library,
  LogIn,
  LogOut,
  ScanLine,
  User,
} from "lucide-react";

const navLinks = [
  { to: "/capture", label: "Capture", icon: ScanLine },
  { to: "/review", label: "Review", icon: Eye },
  { to: "/library", label: "Library", icon: Library },
  { to: "/image-to-pdf", label: "Image to PDF", icon: FileImage },
  { to: "/pdf-compressor", label: "PDF Compress", icon: FileOutput },
];

export function Navbar() {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading, login, logout, principalId } = useAuth();
  const pageCount = useScanStore((s) => s.pages.length);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-scan">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0 mr-2">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <ScanLine className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-foreground hidden sm:block">
            ScanVault
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                to={to}
                data-ocid={`nav.${label.toLowerCase()}_link`}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-scan",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                ].join(" ")}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:block">{label}</span>
                {label === "Review" && pageCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 px-1 text-xs bg-accent text-accent-foreground"
                    data-ocid="nav.review_badge"
                  >
                    {pageCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated ? (
            <>
              <div
                className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono"
                data-ocid="nav.user_info"
              >
                <User className="w-3 h-3" />
                <span className="truncate max-w-[96px]">
                  {principalId?.slice(0, 8)}…
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                data-ocid="nav.logout_button"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:block">Sign out</span>
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoading}
              data-ocid="nav.login_button"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <LogIn className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:block">
                {isLoading ? "Signing in…" : "Sign in"}
              </span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
