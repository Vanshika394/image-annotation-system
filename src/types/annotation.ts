export interface Annotation {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
  notes?: string;
  timestamp: number;
}

export interface Label {
  name: string;
  color: string;
  shortcut?: string;
  description?: string;
}

export interface ImageData {
  url: string;
  name: string;
  annotations: Annotation[];
}