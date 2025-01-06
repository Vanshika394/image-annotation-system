import React from 'react';
import { Plus, X } from 'lucide-react';
import { useAnnotationStore } from '../store/useAnnotationStore';
import type { Label } from '../types/annotation';

export function LabelPanel() {
  const { labels, selectedLabel, setSelectedLabel, addLabel, removeLabel } = useAnnotationStore();

  const handleAddLabel = () => {
    const name = prompt('Enter label name:');
    if (!name) return;

    const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    addLabel({ name, color });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Labels</h2>
        <button
          onClick={handleAddLabel}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {labels.map((label) => (
          <div
            key={label.name}
            className={`flex items-center justify-between p-2 rounded cursor-pointer ${
              selectedLabel?.name === label.name ? 'bg-gray-100' : ''
            }`}
            onClick={() => setSelectedLabel(label)}
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: label.color }}
              />
              <span>{label.name}</span>
              {label.shortcut && (
                <span className="text-xs text-gray-500">
                  ({label.shortcut})
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeLabel(label.name);
              }}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}