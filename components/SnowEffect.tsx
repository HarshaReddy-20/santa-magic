"use client";

import React, { useEffect, useRef, useState } from "react";
import { Snowflake } from "lucide-react";

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snowEnabled, setSnowEnabled] = useState(true);

  useEffect(() => {
    if (!snowEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create snowflakes
    const flakeCount = Math.min(65, Math.floor(width / 22));
    const flakes: Array<{
      x: number;
      y: number;
      radius: number;
      density: number;
      opacity: number;
      speedY: number;
      speedX: number;
    }> = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        density: Math.random() * flakeCount,
        opacity: Math.random() * 0.7 + 0.3,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.01;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(253, 251, 247, ${flake.opacity})`;
        ctx.fill();

        // Update movement
        flake.y += flake.speedY;
        flake.x += Math.sin(angle + flake.density) * 0.6 + flake.speedX;

        // Wrap around borders
        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 10) {
          flake.x = -5;
        } else if (flake.x < -10) {
          flake.x = width + 5;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [snowEnabled]);

  return (
    <>
      {snowEnabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-20 h-full w-full"
        />
      )}
      {/* Discreet toggle button */}
      <button
        type="button"
        onClick={() => setSnowEnabled(!snowEnabled)}
        title={snowEnabled ? "Pause snowfall" : "Enable snowfall"}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-forest-900/80 px-3 py-1.5 text-xs font-medium text-gold-200 shadow-lg backdrop-blur-md transition-all hover:border-gold-400 hover:bg-forest-850 hover:text-gold-100"
      >
        <Snowflake className={`h-3.5 w-3.5 ${snowEnabled ? "animate-spin text-gold-300" : "text-gray-400"}`} style={{ animationDuration: "12s" }} />
        <span>{snowEnabled ? "Snow: On" : "Snow: Off"}</span>
      </button>
    </>
  );
}
