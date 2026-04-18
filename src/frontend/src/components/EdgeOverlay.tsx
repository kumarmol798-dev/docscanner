import { useEffect, useRef } from "react";

interface EdgeOverlayProps {
  isActive: boolean;
  className?: string;
}

export function EdgeOverlay({ isActive, className = "" }: EdgeOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function drawCorner(
      x: number,
      y: number,
      dx: number,
      dy: number,
      size: number,
      alpha: number,
    ) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x + dx * size, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + dy * size);
      ctx.strokeStyle = `oklch(0.6 0.18 200 / ${alpha})`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!isActive) {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          animFrameRef.current = requestAnimationFrame(draw);
        }
        return;
      }

      phaseRef.current += 0.03;
      const pulse = 0.55 + 0.35 * Math.sin(phaseRef.current);

      const W = canvas.width;
      const H = canvas.height;
      const margin = 0.1;
      const x0 = W * margin;
      const y0 = H * margin;
      const x1 = W * (1 - margin);
      const y1 = H * (1 - margin);
      const cornerLen = Math.min(W, H) * 0.12;

      // Semi-transparent overlay
      ctx.fillStyle = "oklch(0.1 0.01 240 / 0.35)";
      ctx.fillRect(0, 0, W, H);
      // Clear document region
      ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
      // Re-draw subtle inner tint
      ctx.fillStyle = "oklch(0.15 0.01 240 / 0.12)";
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);

      // Dashed border
      ctx.setLineDash([8, 5]);
      ctx.strokeStyle = `oklch(0.6 0.18 200 / ${pulse * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.rect(x0, y0, x1 - x0, y1 - y0);
      ctx.stroke();
      ctx.setLineDash([]);

      // Bright corners
      drawCorner(x0, y0, 1, 1, cornerLen, pulse);
      drawCorner(x1, y0, -1, 1, cornerLen, pulse);
      drawCorner(x0, y1, 1, -1, cornerLen, pulse);
      drawCorner(x1, y1, -1, -1, cornerLen, pulse);

      // Scan line sweep
      const scanY = y0 + (y1 - y0) * ((phaseRef.current * 0.4) % 1);
      const grad = ctx.createLinearGradient(x0, scanY - 10, x0, scanY + 10);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, `oklch(0.7 0.18 200 / ${pulse * 0.4})`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x0, scanY - 10, x1 - x0, 20);

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReduced) {
      animFrameRef.current = requestAnimationFrame(draw);
    } else {
      // Static render for reduced-motion users: just draw once without animation
      draw();
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
