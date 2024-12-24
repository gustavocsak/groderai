"use client";

import { useEffect, useRef } from "react";

export default function WaveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      t += 0.012;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const rows = 50;
      const cols = 100;
      const cellWidth = canvas.width / cols;
      const cellHeight = canvas.height / rows;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(225, 29, 72, 0.9)"; // pink-600 with opacity
      ctx.lineWidth = 1.5;

      for (let i = 0; i < rows; i++) {
        const y = cellHeight * i;
        ctx.moveTo(0, y);

        for (let j = 0; j < cols; j++) {
          const x = cellWidth * j;
          const distanceToCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) +
              Math.pow(y - canvas.height / 2, 2),
          );
          const wave = Math.sin(distanceToCenter * 0.02 + t) * 20;

          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
    />
  );
}
