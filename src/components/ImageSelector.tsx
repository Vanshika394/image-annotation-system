import React, { useRef } from 'react';
import { ImageIcon, Upload } from 'lucide-react';
import { useAnnotationStore } from '../store/useAnnotationStore';

const SAMPLE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
    name: 'Dog Portrait'
  },
  {
    url: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a',
    name: 'Urban Scene'
  }
];

export function ImageSelector() {
  const { setCurrentImage } = useAnnotationStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setCurrentImage({
      url: imageUrl,
      name: file.name
    });

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Select Image</h2>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {SAMPLE_IMAGES.map((image) => (
          <button
            key={image.url}
            className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-500"
            onClick={() => setCurrentImage(image)}
          >
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-medium">{image.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}