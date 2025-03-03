export const downloadFromUrl = (url: string, filename?: string) => {
  const anchor = document.createElement('a');
  // anchor.style.display = 'none';
  anchor.setAttribute('href', url);
  anchor.setAttribute('download', filename || 'download');
  document.body.appendChild(anchor);

  anchor.click();

  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
};
