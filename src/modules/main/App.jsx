import { useState } from 'react';
import './index.css';
import { FileUploader } from '../file-uploader';

export function App() {
  const [file, setFile] = useState(null);

  return (
    <div>
      <FileUploader onFileUploaded={setFile} />
    </div>
  );
}
