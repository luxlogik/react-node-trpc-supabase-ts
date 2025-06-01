import { useState, useEffect } from 'react';

export default function TypewriterLoader() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Loading system...';

  useEffect(() => {
    let currentIndex = 0;
    let direction = 1; // 1 for typing, -1 for deleting

    const interval = setInterval(() => {
      if (direction === 1) {
        // Typing
        if (currentIndex <= fullText.length) {
          setText(fullText.substring(0, currentIndex));
          currentIndex += 1;
        } else {
          // Pause at the end before deleting
          setTimeout(() => {
            direction = -1;
          }, 1000);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          currentIndex -= 1;
          setText(fullText.substring(0, currentIndex));
        } else {
          // Start typing again
          direction = 1;
          // Change the text for variety
        }
      }
    }, 100);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="font-mono text-lg flex items-center">
      <div className="bg-zinc-900 text-green-400 px-4 py-2 rounded-md flex items-center">
        <span className="mr-1">&gt;</span>
        <span>{text}</span>
        <span
          className={`w-2 h-5 bg-green-400 ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Terminal decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-2 flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500 opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
