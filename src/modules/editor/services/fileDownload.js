/* eslint-disable no-undef */
export function downloadFile(fileName, content) {
  const element = document.createElement('a');
  const file = new Blob([content], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
}
