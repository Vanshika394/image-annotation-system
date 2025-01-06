import React, { useRef, useState, useEffect } from 'react';
import { useAnnotationStore } from '../store/useAnnotationStore';

interface Point {
  x: number;
  y: number;
}

export function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [previewRect, setPreviewRect] = useState<Point & { width: number; height: number } | null>(null);
  
  const { 
    addAnnotation, 
    selectedLabel, 
    currentImage,
    annotations 
  } = useAnnotationStore();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedLabel || !currentImage) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDrawing(true);
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setStartPoint(point);
    setPreviewRect({ ...point, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !startPoint || !selectedLabel) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setPreviewRect({
      x: startPoint.x,
      y: startPoint.y,
      width: currentPoint.x - startPoint.x,
      height: currentPoint.y - startPoint.y,
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !startPoint || !selectedLabel) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const endPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const width = endPoint.x - startPoint.x;
    const height = endPoint.y - startPoint.y;

    // Only add annotation if the rectangle has some size
    if (Math.abs(width) > 5 && Math.abs(height) > 5) {
      addAnnotation({
        id: Date.now().toString(),
        x: startPoint.x,
        y: startPoint.y,
        width,
        height,
        label: selectedLabel.name,
        color: selectedLabel.color,
        timestamp: Date.now()
      });
    }

    setIsDrawing(false);
    setStartPoint(null);
    setPreviewRect(null);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { labels, setSelectedLabel } = useAnnotationStore.getState();
      const label = labels.find(l => l.shortcut === e.key.toLowerCase());
      if (label) {
        setSelectedLabel(label);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  if (!currentImage) {
    return (
      <div className="w-full h-[600px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Please select an image to start annotating</p>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[600px] border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        src={currentImage.url}
        alt="Selected"
        className="w-full h-full object-contain"
      />
      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          style={{
            position: 'absolute',
            left: annotation.x,
            top: annotation.y,
            width: annotation.width,
            height: annotation.height,
            border: `2px solid ${annotation.color}`,
            backgroundColor: `${annotation.color}20`,
          }}
        >
          <span
            className="absolute -top-6 left-0 px-2 py-1 text-sm text-white rounded"
            style={{ backgroundColor: annotation.color }}
          >
            {annotation.label}
          </span>
        </div>
      ))}
      {previewRect && (
        <div
          style={{
            position: 'absolute',
            left: previewRect.x,
            top: previewRect.y,
            width: previewRect.width,
            height: previewRect.height,
            border: `2px dashed ${selectedLabel?.color}`,
            backgroundColor: `${selectedLabel?.color}10`,
          }}
        />
      )}
    </div>
  );
}