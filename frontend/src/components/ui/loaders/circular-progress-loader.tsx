import { useState, useEffect } from 'react';

export default function CircularProgressLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Calculate the circumference of the circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Background track */}
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="8"
          fill="transparent"
        />

        {/* Progress indicator */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-300 ease-out"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-semibold">{Math.round(progress)}%</span>
      </div>

      {/* Animated dots around the circle */}
      {[...Array(8)].map((_, i) => {
        const angle = i * 45 * (Math.PI / 180);
        const x = 64 + Math.cos(angle) * 70;
        const y = 64 + Math.sin(angle) * 70;
        const isActive = ((i * 45) / 360) * 100 <= progress;

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill={isActive ? '#8b5cf6' : '#e2e8f0'}
            className="transition-colors duration-300"
          />
        );
      })}
    </div>
  );
}
