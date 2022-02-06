import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import './index.css';
import { Editor } from '../editor';
import { FileUploader } from '../file-uploader';

export function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUploaded = useCallback((name, content) => {
    setFile(content);
    setFileName(name);
  }, []);

  const isFileUploaded = useMemo(() => !_.isEmpty(file), [file]);

  return (
    <div>
      {!isFileUploaded && <FileUploader onFileUploaded={handleFileUploaded} />}
      {isFileUploaded && <Editor file={file} name={fileName} />}
    </div>
  );
}
