import { useState, useEffect } from 'react';

interface ComponentLoaderProps {
  type?: 'card' | 'list' | 'table' | 'form';
  className?: string;
}

export default function ComponentLoader({
  type = 'card',
  className = '',
}: ComponentLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Shimmer effect
  const shimmer = `
    after:absolute after:inset-0
    after:translate-x-[-100%]
    after:animate-[shimmer_1.5s_infinite]
    after:bg-gradient-to-r
    after:from-transparent after:via-white/10 after:to-transparent
  `;

  const renderCardSkeleton = () => (
    <div
      className={`relative overflow-hidden rounded-lg ${shimmer} ${className}`}
    >
      <div className="h-full w-full bg-zinc-200/20 rounded-lg">
        {/* Header */}
        <div className="h-6 w-2/3 bg-zinc-300/30 rounded-md m-4"></div>

        {/* Content */}
        <div className="px-4 space-y-3">
          <div className="h-4 bg-zinc-300/30 rounded-md w-full"></div>
          <div className="h-4 bg-zinc-300/30 rounded-md w-5/6"></div>
          <div className="h-4 bg-zinc-300/30 rounded-md w-4/6"></div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="h-8 w-20 bg-zinc-300/30 rounded-md"></div>
          <div className="h-8 w-8 bg-zinc-300/30 rounded-full"></div>
        </div>

        {/* Progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div
      className={`relative overflow-hidden rounded-lg ${shimmer} ${className}`}
    >
      <div className="h-full w-full bg-zinc-200/20 rounded-lg p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-zinc-300/30 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-zinc-300/30 rounded-md w-1/3"></div>
              <div className="h-3 bg-zinc-300/30 rounded-md w-2/3"></div>
            </div>
          </div>
        ))}

        {/* Progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <div
      className={`relative overflow-hidden rounded-lg ${shimmer} ${className}`}
    >
      <div className="h-full w-full bg-zinc-200/20 rounded-lg">
        {/* Header */}
        <div className="flex border-b border-zinc-300/30 p-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-zinc-300/30 rounded-md flex-1 mx-1"
            ></div>
          ))}
        </div>

        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex border-b border-zinc-300/20 p-3">
            {[...Array(4)].map((_, j) => (
              <div
                key={j}
                className="h-4 bg-zinc-300/30 rounded-md flex-1 mx-1"
              ></div>
            ))}
          </div>
        ))}

        {/* Progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  const renderFormSkeleton = () => (
    <div
      className={`relative overflow-hidden rounded-lg ${shimmer} ${className}`}
    >
      <div className="h-full w-full bg-zinc-200/20 rounded-lg p-4 space-y-4">
        {/* Form title */}
        <div className="h-6 w-1/3 bg-zinc-300/30 rounded-md mx-auto mb-6"></div>

        {/* Form fields */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-zinc-300/30 rounded-md w-1/4"></div>
            <div className="h-10 bg-zinc-300/30 rounded-md w-full"></div>
          </div>
        ))}

        {/* Submit button */}
        <div className="h-10 bg-zinc-300/30 rounded-md w-1/3 mx-auto mt-6"></div>

        {/* Progress indicator */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );

  switch (type) {
    case 'list':
      return renderListSkeleton();
    case 'table':
      return renderTableSkeleton();
    case 'form':
      return renderFormSkeleton();
    case 'card':
    default:
      return renderCardSkeleton();
  }
}
