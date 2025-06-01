import React, { useRef, useState, useEffect, ReactElement } from 'react';

interface DraggableProps {
  children: ReactElement; // must be a single React element
  initialPosition?: { x: number; y: number };
  className?: string;
  dragThreshold?: number; // pixels to move before starting drag
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export default function Draggable({
  children,
  initialPosition = { x: 0, y: 0 },
  className = '',
  dragThreshold = 5,
  onPositionChange,
}: DraggableProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const mouseStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    mouseStart.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    // Prevent text selection while dragging
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseDown) return;
      const dx = e.clientX - mouseStart.current.x;
      const dy = e.clientY - mouseStart.current.y;
      if (!isDragging && Math.sqrt(dx * dx + dy * dy) > dragThreshold) {
        setIsDragging(true);
      }
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
      }
      setMouseDown(false);
      onPositionChange?.({ x: e.clientX, y: e.clientY });
      document.body.style.userSelect = '';
    };
    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [mouseDown, isDragging, dragThreshold]);

  // Only disable child if actually dragging
  const childWithProps = React.cloneElement(children, {
    disabled: isDragging || children.props.disabled,
  });

  return (
    <div
      className={`fixed z-50 ${className}`}
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'box-shadow 0.2s',
      }}
      onMouseDown={handleMouseDown}
    >
      {childWithProps}
    </div>
  );
}
