import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export type QualityLevel = "good" | "low-light" | "unstable" | "checking";

export interface CaptureQuality {
  lighting: QualityLevel;
  stability: QualityLevel;
}

export interface CameraError {
  type: "permission" | "not-supported" | "not-found" | "unknown";
  message: string;
}

export interface UseCameraReturn {
  isActive: boolean;
  isSupported: boolean | null;
  isLoading: boolean;
  error: CameraError | null;
  quality: CaptureQuality;
  startCamera: () => Promise<boolean>;
  stopCamera: () => Promise<void>;
  capturePhoto: () => Promise<File | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function useCamera(): UseCameraReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<CameraError | null>(null);
  const [quality, setQuality] = useState<CaptureQuality>({
    lighting: "checking",
    stability: "checking",
  });

  const qualityIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const lastPixelSumRef = useRef(0);
  const motionFramesRef = useRef(0);
  const frameCountRef = useRef(0);

  useEffect(() => {
    setIsSupported(!!navigator.mediaDevices?.getUserMedia);
  }, []);

  const analyzeQuality = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = 80;
    const h = 60;
    canvas.width = w;
    canvas.height = h;
    try {
      ctx.drawImage(video, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let pixelSum = 0;
      for (let i = 0; i < data.length; i += 16) {
        pixelSum += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      const avgBrightness = pixelSum / (data.length / 16);
      const lighting: QualityLevel = avgBrightness > 55 ? "good" : "low-light";
      const diff = Math.abs(pixelSum - lastPixelSumRef.current);
      lastPixelSumRef.current = pixelSum;
      if (diff > 5000) {
        motionFramesRef.current = Math.min(motionFramesRef.current + 1, 5);
      } else {
        motionFramesRef.current = Math.max(motionFramesRef.current - 1, 0);
      }
      const stability: QualityLevel =
        motionFramesRef.current >= 3 ? "unstable" : "good";
      frameCountRef.current += 1;
      if (frameCountRef.current > 2) {
        setQuality({ lighting, stability });
      }
    } catch {
      // canvas tainted or video not ready
    }
  }, []);

  const stopCamera = useCallback(async () => {
    if (qualityIntervalRef.current) clearInterval(qualityIntervalRef.current);
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setQuality({ lighting: "checking", stability: "checking" });
  }, []);

  const startCamera = useCallback(async (): Promise<boolean> => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setIsSupported(false);
      return false;
    }
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      setIsLoading(false);
      frameCountRef.current = 0;
      motionFramesRef.current = 0;
      qualityIntervalRef.current = setInterval(analyzeQuality, 800);
      return true;
    } catch (err) {
      setIsLoading(false);
      const domErr = err as { name?: string };
      if (
        domErr.name === "NotAllowedError" ||
        domErr.name === "PermissionDeniedError"
      ) {
        setError({
          type: "permission",
          message:
            "Camera permission denied. Please allow camera access in your browser settings.",
        });
      } else if (
        domErr.name === "NotFoundError" ||
        domErr.name === "DevicesNotFoundError"
      ) {
        setError({
          type: "not-found",
          message: "No camera found. Connect a camera and try again.",
        });
      } else {
        setError({
          type: "unknown",
          message: "Could not start camera. Please try again.",
        });
      }
      return false;
    }
  }, [analyzeQuality]);

  const capturePhoto = useCallback(async (): Promise<File | null> => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !isActive) return null;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          resolve(
            new File([blob], `scan-${Date.now()}.jpg`, { type: "image/jpeg" }),
          );
        },
        "image/jpeg",
        0.92,
      );
    });
  }, [isActive]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    isActive,
    isSupported,
    isLoading,
    error,
    quality,
    startCamera,
    stopCamera,
    capturePhoto,
    videoRef,
    canvasRef,
  };
}
