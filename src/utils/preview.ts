export const openPreviewWindow = (content: string) => {
  if (typeof window === 'undefined') return;

  const previewWindow = window.open('/preview', '_blank');
  if (previewWindow) {
    localStorage.setItem('previewContent', content);
  }
};
