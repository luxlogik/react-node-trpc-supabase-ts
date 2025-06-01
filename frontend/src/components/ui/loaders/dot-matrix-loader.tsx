import { useState, useEffect } from 'react';

export default function DotMatrixLoader() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const rows = 4;
  const cols = 4;

  useEffect(() => {
    const totalDots = rows * cols;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (totalDots + 1));
    }, 100);

    return () => clearInterval(interval);
  }, [rows, cols]);

  // Create patterns
  const patterns = [
    // Spiral pattern (clockwise from outside to inside)
    [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4, 5, 6, 10, 9],
    // Diagonal pattern
    [0, 5, 10, 15, 1, 6, 11, 4, 9, 14, 2, 7, 12, 3, 8, 13],
    // Alternating rows
    [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11, 15, 14, 13, 12],
  ];

  // Select a pattern based on time
  const patternIndex = Math.floor(Date.now() / 5000) % patterns.length;
  const currentPattern = patterns[patternIndex];

  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: rows * cols }).map((_, index) => {
        // Find position in the current pattern
        const patternPosition = currentPattern
          ? currentPattern.indexOf(index)
          : -1;
        // Determine if dot should be active based on animation progress
        const isActive =
          patternPosition <= activeIndex && activeIndex < rows * cols;

        return (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-br from-blue-400 to-purple-500 scale-100'
                : 'bg-gray-200 scale-75'
            }`}
            style={{
              transform: isActive ? 'scale(1)' : 'scale(0.75)',
              opacity: isActive ? 1 : 0.5,
              boxShadow: isActive ? '0 0 10px rgba(79, 70, 229, 0.5)' : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
