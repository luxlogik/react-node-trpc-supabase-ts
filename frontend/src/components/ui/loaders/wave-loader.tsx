'use client';

import { useEffect, useRef } from 'react';

export default function WaveLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 200 * dpr;
    canvas.height = 100 * dpr;
    ctx.scale(dpr, dpr);

    // Wave parameters
    const waves = [
      {
        amplitude: 15,
        frequency: 0.02,
        speed: 0.05,
        color: '#3b82f6',
        phase: 0,
      },
      {
        amplitude: 10,
        frequency: 0.03,
        speed: 0.03,
        color: '#8b5cf6',
        phase: 2,
      },
      {
        amplitude: 5,
        frequency: 0.04,
        speed: 0.02,
        color: '#ec4899',
        phase: 4,
      },
    ];

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, 200, 100);

      // Update and draw each wave
      waves.forEach((wave) => {
        wave.phase += wave.speed;

        ctx.beginPath();
        ctx.moveTo(0, 50);

        for (let x = 0; x < 200; x++) {
          const y =
            50 + wave.amplitude * Math.sin(x * wave.frequency + wave.phase);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      // Draw dots at intersections
      for (let x = 0; x < 200; x += 20) {
        waves.forEach((wave) => {
          const y =
            50 + wave.amplitude * Math.sin(x * wave.frequency + wave.phase);

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = wave.color;
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: '200px', height: '100px' }}
        className="rounded-lg"
      />
    </div>
  );
}
