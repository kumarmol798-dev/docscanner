import { useCallback, useState } from "react";
import type { ScanPage } from "../types";

export type ExportStatus = "idle" | "generating" | "done" | "error";

export function useExport() {
  const [pdfStatus, setPdfStatus] = useState<ExportStatus>("idle");
  const [imgStatus, setImgStatus] = useState<ExportStatus>("idle");

  const exportPdf = useCallback(
    async (pages: ScanPage[], documentName: string) => {
      if (pages.length === 0) return;
      setPdfStatus("generating");
      try {
        const { jsPDF } = await import("jspdf");

        const loadImage = (src: string): Promise<HTMLImageElement> =>
          new Promise((res, rej) => {
            const img = new Image();
            img.onload = () => res(img);
            img.onerror = rej;
            img.src = src;
          });

        const first = await loadImage(pages[0].imageDataUrl);
        const isPortrait = first.naturalHeight >= first.naturalWidth;
        const orientation = isPortrait ? "portrait" : "landscape";

        const pdf = new jsPDF({
          orientation,
          unit: "px",
          hotfixes: ["px_scaling"],
        });

        for (let i = 0; i < pages.length; i++) {
          if (i > 0) pdf.addPage();
          const img = await loadImage(pages[i].imageDataUrl);
          const { naturalWidth: w, naturalHeight: h } = img;

          // Fit page
          const pW = pdf.internal.pageSize.getWidth();
          const pH = pdf.internal.pageSize.getHeight();
          const scale = Math.min(pW / w, pH / h);
          const dw = w * scale;
          const dh = h * scale;
          const dx = (pW - dw) / 2;
          const dy = (pH - dh) / 2;

          if (pages[i].rotation !== 0) {
            // Draw rotated via canvas
            const canvas = document.createElement("canvas");
            const rot = pages[i].rotation;
            const swapped = rot === 90 || rot === 270;
            canvas.width = swapped ? h : w;
            canvas.height = swapped ? w : h;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate((rot * Math.PI) / 180);
              ctx.drawImage(img, -w / 2, -h / 2);
            }
            pdf.addImage(
              canvas.toDataURL("image/jpeg", 0.9),
              "JPEG",
              dx,
              dy,
              dw,
              dh,
            );
          } else {
            pdf.addImage(pages[i].imageDataUrl, "JPEG", dx, dy, dw, dh);
          }
        }

        const fileName = `${documentName || "document"}.pdf`;
        pdf.save(fileName);
        setPdfStatus("done");
        setTimeout(() => setPdfStatus("idle"), 2000);
      } catch {
        setPdfStatus("error");
        setTimeout(() => setPdfStatus("idle"), 3000);
      }
    },
    [],
  );

  const exportImage = useCallback(
    async (page: ScanPage, documentName: string) => {
      setImgStatus("generating");
      try {
        const canvas = document.createElement("canvas");
        const img = await new Promise<HTMLImageElement>((res, rej) => {
          const el = new Image();
          el.onload = () => res(el);
          el.onerror = rej;
          el.src = page.imageDataUrl;
        });

        const rot = page.rotation;
        const swapped = rot === 90 || rot === 270;
        canvas.width = swapped ? img.naturalHeight : img.naturalWidth;
        canvas.height = swapped ? img.naturalWidth : img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rot * Math.PI) / 180);
          ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        }

        const blob = await new Promise<Blob | null>((res) =>
          canvas.toBlob(res, "image/jpeg", 0.92),
        );
        if (!blob) throw new Error("Failed to generate image");

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${documentName || "page_1"}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setImgStatus("done");
        setTimeout(() => setImgStatus("idle"), 2000);
      } catch {
        setImgStatus("error");
        setTimeout(() => setImgStatus("idle"), 3000);
      }
    },
    [],
  );

  return { exportPdf, exportImage, pdfStatus, imgStatus };
}
