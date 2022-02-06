import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import { Editor } from '../editor';
import { FileUploader } from '../file-uploader';
import { isFileUploaded, uploadFile } from '../subtitles';

export function App() {
  const dispatch = useDispatch();

  const handleFileUploaded = useCallback(
    (name, content) => {
      dispatch(uploadFile({ name, subtitle: content }));
    },
    [dispatch],
  );

  const hasFile = useSelector(isFileUploaded);

  return (
    <div>
      {!hasFile && <FileUploader onFileUploaded={handleFileUploaded} />}
      {hasFile && <Editor />}
    </div>
  );
}
