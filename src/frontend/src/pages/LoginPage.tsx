import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "@tanstack/react-router";
import { Archive, ScanLine, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: ScanLine,
    label: "Edge-detect scanning",
    desc: "Automatic document boundary detection",
  },
  {
    icon: Zap,
    label: "Instant enhancement",
    desc: "Contrast, brightness & B&W modes",
  },
  {
    icon: Archive,
    label: "Secure library",
    desc: "All docs stored on the Internet Computer",
  },
  {
    icon: Shield,
    label: "Self-sovereign auth",
    desc: "Internet Identity — no passwords",
  },
];

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();

  if (isAuthenticated) return <Navigate to="/library" />;

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-12"
      data-ocid="login.page"
    >
      {/* Hero card */}
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shadow-scan animate-edge-detect">
            <ScanLine className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              ScanVault
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Professional document scanning, on-chain.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div
          className="grid grid-cols-2 gap-3"
          data-ocid="login.features_section"
        >
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-lg p-3.5 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-semibold font-display text-foreground">
                  {label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-tight">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-base h-12 shadow-scan transition-scan"
            onClick={login}
            disabled={isLoading}
            data-ocid="login.submit_button"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Connecting…
              </span>
            ) : (
              "Sign in with Internet Identity"
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            No password needed · Fully decentralized · Your keys, your docs
          </p>
        </div>
      </div>
    </div>
  );
}
