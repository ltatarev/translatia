export function downloadFile(fileName, content) {
  const file = new Blob([content]);

  const element = document.createElement('a');
  element.href = URL.createObjectURL(file);
  element.setAttribute('download', `${fileName}.srt`);
  document.body.appendChild(element);

  element.click();

  // Clean up after download
  element.parentNode.removeChild(element);
}
