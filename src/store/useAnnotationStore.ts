import { create } from 'zustand';
import { Annotation, Label, ImageData } from '../types/annotation';

interface AnnotationStore {
  annotations: Annotation[];
  labels: Label[];
  selectedLabel: Label | null;
  currentImage: ImageData | null;
  addAnnotation: (annotation: Annotation) => void;
  removeAnnotation: (id: string) => void;
  addLabel: (label: Label) => void;
  removeLabel: (name: string) => void;
  setSelectedLabel: (label: Label | null) => void;
  setCurrentImage: (image: Pick<ImageData, 'url' | 'name'>) => void;
}

export const useAnnotationStore = create<AnnotationStore>((set) => ({
  annotations: [],
  labels: [
    { name: 'Person', color: '#FF6B6B', shortcut: 'p', description: 'Human figures' },
    { name: 'Vehicle', color: '#4ECDC4', shortcut: 'v', description: 'Cars, bikes, etc.' },
    { name: 'Animal', color: '#45B7D1', shortcut: 'a', description: 'Any animal' },
    { name: 'Object', color: '#96CEB4', shortcut: 'o', description: 'Inanimate objects' }
  ],
  selectedLabel: null,
  currentImage: null,
  addAnnotation: (annotation) =>
    set((state) => ({ annotations: [...state.annotations, annotation] })),
  removeAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id),
    })),
  addLabel: (label) =>
    set((state) => ({ labels: [...state.labels, label] })),
  removeLabel: (name) =>
    set((state) => ({
      labels: state.labels.filter((l) => l.name !== name),
    })),
  setSelectedLabel: (label) => set({ selectedLabel: label }),
  setCurrentImage: (image) => set({
    currentImage: { ...image, annotations: [] },
    annotations: [] // Reset annotations when changing image
  }),
}));