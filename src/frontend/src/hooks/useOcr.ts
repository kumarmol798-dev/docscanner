import { useCallback, useRef, useState } from "react";
import type { Worker as TesseractWorker } from "tesseract.js";

export interface OcrResult {
  pageId: string;
  text: string;
  confidence: number;
}

export interface OcrState {
  status: "idle" | "loading" | "done" | "error";
  text: string;
  confidence: number;
  error?: string;
}

type OcrStore = Record<string, OcrState>;

export function useOcr() {
  const [store, setStore] = useState<OcrStore>({});
  const workerRef = useRef<TesseractWorker | null>(null);

  const getState = useCallback(
    (pageId: string): OcrState =>
      store[pageId] ?? { status: "idle", text: "", confidence: 0 },
    [store],
  );

  const runOcr = useCallback(async (pageId: string, imageDataUrl: string) => {
    setStore((prev) => ({
      ...prev,
      [pageId]: { status: "loading", text: "", confidence: 0 },
    }));

    try {
      // Dynamically import Tesseract.js only when needed
      const { createWorker } = await import("tesseract.js");

      if (!workerRef.current) {
        workerRef.current = await createWorker("eng", 1, {
          logger: () => {
            /* suppress */
          },
        });
      }

      const worker = workerRef.current;
      if (!worker) throw new Error("Worker not initialized");
      const { data } = await worker.recognize(imageDataUrl);

      setStore((prev) => ({
        ...prev,
        [pageId]: {
          status: "done",
          text: data.text.trim(),
          confidence: Math.round(data.confidence),
        },
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "OCR failed";
      setStore((prev) => ({
        ...prev,
        [pageId]: { status: "error", text: "", confidence: 0, error: msg },
      }));
    }
  }, []);

  const clearOcr = useCallback((pageId: string) => {
    setStore((prev) => {
      const next = { ...prev };
      delete next[pageId];
      return next;
    });
  }, []);

  return { getState, runOcr, clearOcr };
}
