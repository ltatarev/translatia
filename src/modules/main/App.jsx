import { useMemo, useState } from 'react';
import _ from 'lodash';
import './index.css';
import { Editor } from '../editor';
import { FileUploader } from '../file-uploader';

export function App() {
  const [file, setFile] = useState(null);

  const isFileUploaded = useMemo(() => !_.isEmpty(file), [file]);

  return (
    <div>
      {!isFileUploaded && <FileUploader onFileUploaded={setFile} />}
      {isFileUploaded && <Editor file={file} />}
    </div>
  );
}
