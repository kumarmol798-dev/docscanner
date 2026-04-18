import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, Loader2, SunMedium, Zap } from "lucide-react";
import type { RefObject } from "react";
import type { CaptureQuality } from "../hooks/useCamera";
import { EdgeOverlay } from "./EdgeOverlay";

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  isActive: boolean;
  isLoading: boolean;
  isSupported: boolean | null;
  error: { type: string; message: string } | null;
  quality: CaptureQuality;
  onStart: () => void;
}

export function CameraView({
  videoRef,
  canvasRef,
  isActive,
  isLoading,
  isSupported,
  error,
  quality,
  onStart,
}: CameraViewProps) {
  const lightingLabel =
    quality.lighting === "good"
      ? "Good Light"
      : quality.lighting === "low-light"
        ? "Low Light"
        : "Checking...";
  const stabilityLabel =
    quality.stability === "good"
      ? "Stable"
      : quality.stability === "unstable"
        ? "Move Slower"
        : "Checking...";
  const lightingColor =
    quality.lighting === "good"
      ? "bg-primary/20 text-primary border-primary/30"
      : quality.lighting === "low-light"
        ? "bg-accent/20 text-accent border-accent/30"
        : "bg-muted text-muted-foreground border-border";
  const stabilityColor =
    quality.stability === "good"
      ? "bg-primary/20 text-primary border-primary/30"
      : quality.stability === "unstable"
        ? "bg-accent/20 text-accent border-accent/30"
        : "bg-muted text-muted-foreground border-border";

  return (
    <div
      className="relative w-full h-full bg-black rounded-xl overflow-hidden min-h-0"
      data-ocid="camera.panel"
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        style={{ display: isActive ? "block" : "none" }}
        aria-label="Camera preview"
      />
      {/* Hidden canvas for capture / quality analysis */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Edge detection overlay */}
      {isActive && <EdgeOverlay isActive={isActive} />}

      {/* Idle / Loading / Error overlays */}
      {!isActive && !isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card/90">
          {isSupported === false ? (
            <div className="text-center space-y-2 px-6">
              <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
              <p className="font-display font-semibold text-foreground">
                Camera not supported
              </p>
              <p className="text-sm text-muted-foreground">
                Your browser doesn't support camera access. Try Chrome or
                Safari.
              </p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-foreground">
                  Tap to start camera
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Point at your document
                </p>
              </div>
              <Button
                type="button"
                onClick={onStart}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold transition-scan"
                data-ocid="camera.start_button"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            </>
          )}
        </div>
      )}

      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-card/80"
          data-ocid="camera.loading_state"
        >
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground font-display">
              Starting camera…
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card/90 px-6"
          data-ocid="camera.error_state"
        >
          <AlertCircle className="w-10 h-10 text-destructive" />
          <div className="text-center">
            <p className="font-display font-semibold text-foreground">
              Camera error
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {error.message}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={onStart}
            data-ocid="camera.retry_button"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Quality badges — only when active */}
      {isActive && (
        <div
          className="absolute top-3 left-3 flex gap-2"
          data-ocid="camera.quality_badges"
        >
          <Badge className={`text-xs border transition-scan ${lightingColor}`}>
            <SunMedium className="w-3 h-3 mr-1" />
            {lightingLabel}
          </Badge>
          <Badge className={`text-xs border transition-scan ${stabilityColor}`}>
            <Zap className="w-3 h-3 mr-1" />
            {stabilityLabel}
          </Badge>
        </div>
      )}
    </div>
  );
}
