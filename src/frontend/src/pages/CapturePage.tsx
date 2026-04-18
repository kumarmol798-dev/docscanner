import { useScanStore } from "@/store/scanStore";
import type { ScanPage } from "@/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { CameraView } from "../components/CameraView";
import { CapturePageStrip } from "../components/CapturePageStrip";
import { ImageEnhancer } from "../components/ImageEnhancer";
import { useCamera } from "../hooks/useCamera";

type CaptureStep = "preview" | "enhance";

export default function CapturePage() {
  const { pages, addPage, removePage } = useScanStore();
  const [step, setStep] = useState<CaptureStep>("preview");
  const [pendingPage, setPendingPage] = useState<ScanPage | null>(null);

  const {
    videoRef,
    canvasRef,
    isActive,
    isLoading,
    isSupported,
    error,
    quality,
    startCamera,
    capturePhoto,
  } = useCamera();

  const handleCapture = useCallback(async () => {
    if (!isActive) return;
    const file = await capturePhoto();
    if (!file) {
      toast.error("Could not capture photo. Try again.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const imageDataUrl = ev.target?.result as string;
      const page: ScanPage = {
        id: `scan-${Date.now()}`,
        imageDataUrl,
        rotation: 0,
        file,
      };
      setPendingPage(page);
      setStep("enhance");
    };
    reader.readAsDataURL(file);
  }, [isActive, capturePhoto]);

  const handleEnhancerConfirm = useCallback(
    (updatedPage: ScanPage) => {
      addPage(updatedPage);
      setPendingPage(null);
      setStep("preview");
      toast.success("Page added to session");
    },
    [addPage],
  );

  const handleEnhancerDiscard = useCallback(() => {
    setPendingPage(null);
    setStep("preview");
  }, []);

  return (
    <div
      className="flex-1 flex flex-col min-h-0 overflow-hidden"
      data-ocid="capture.page"
    >
      {/* Main area */}
      <div className="flex-1 flex min-h-0 gap-0">
        {/* Left: Camera view */}
        <div
          className={`flex flex-col min-h-0 transition-scan ${step === "enhance" ? "w-1/2 p-3" : "flex-1 p-3"}`}
          data-ocid="capture.camera_section"
        >
          <div className="flex-1 relative min-h-0">
            <CameraView
              videoRef={videoRef}
              canvasRef={canvasRef}
              isActive={isActive}
              isLoading={isLoading}
              isSupported={isSupported}
              error={error}
              quality={quality}
              onStart={startCamera}
            />
          </div>

          {/* Capture controls */}
          {isActive && step === "preview" && (
            <div className="flex items-center justify-center gap-3 pt-3 flex-shrink-0">
              <button
                type="button"
                aria-label="Capture document"
                onClick={handleCapture}
                data-ocid="capture.capture_button"
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground flex items-center justify-center shadow-scan transition-scan border-4 border-primary/30"
              >
                <span className="w-10 h-10 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/60 block" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Enhancer panel (slides in after capture) */}
        {step === "enhance" && pendingPage && (
          <div
            className="w-1/2 flex flex-col border-l border-border bg-card/40 p-4 min-h-0"
            data-ocid="capture.enhancer_section"
          >
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h2 className="font-display font-semibold text-foreground text-sm">
                Adjust Image
              </h2>
            </div>
            <div className="flex-1 min-h-0">
              <ImageEnhancer
                page={pendingPage}
                onConfirm={handleEnhancerConfirm}
                onDiscard={handleEnhancerDiscard}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom: page strip */}
      <CapturePageStrip pages={pages} onRemove={removePage} />
    </div>
  );
}
