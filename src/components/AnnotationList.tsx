import React from 'react';
import { Trash2 } from 'lucide-react';
import { useAnnotationStore } from '../store/useAnnotationStore';
import { exportAnnotations } from '../utils/exportUtils';

export function AnnotationList() {
  const { annotations, removeAnnotation, currentImage } = useAnnotationStore();

  const handleExport = () => {
    if (currentImage) {
      exportAnnotations(annotations, currentImage.name);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Annotations</h2>
        <button
          onClick={handleExport}
          className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Export JSON
        </button>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {annotations.map((annotation) => (
          <div
            key={annotation.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: annotation.color }}
              />
              <span className="font-medium">{annotation.label}</span>
              <span className="text-sm text-gray-500">
                {new Date(annotation.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={() => removeAnnotation(annotation.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}