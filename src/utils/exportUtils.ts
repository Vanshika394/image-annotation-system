export const exportAnnotations = (annotations: Annotation[], imageName: string) => {
  const data = {
    image: imageName,
    timestamp: new Date().toISOString(),
    annotations: annotations.map(ann => ({
      ...ann,
      timestamp: new Date(ann.timestamp).toISOString()
    }))
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `annotations-${imageName}-${new Date().toISOString()}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
};