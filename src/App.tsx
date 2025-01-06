import React from 'react';
import { Canvas } from './components/Canvas';
import { LabelPanel } from './components/LabelPanel';
import { ImageSelector } from './components/ImageSelector';
import { AnnotationList } from './components/AnnotationList';
import { ImageIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Image Annotation System
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            Select a label and draw rectangles to annotate the image
          </p>
        </header>

        <ImageSelector />

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3 space-y-8">
            <Canvas />
            <AnnotationList />
          </div>
          <div className="col-span-1">
            <LabelPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;