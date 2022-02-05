/* eslint-disable no-undef */
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.css';

export function FileUploader({ onFileUploaded }) {
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => null;
        reader.onerror = () => setError('File reading has failed');
        reader.onload = () => {
          const binaryStr = reader.result;

          console.log(binaryStr);
        };

        reader.readAsText(file);
      });

      return onFileUploaded(acceptedFiles);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const dropzoneClassnames = useMemo(() => {
    classNames('dropzone__container', {
      'dropzone__active-drop': isDragActive,
    });
  }, [isDragActive]);

  return (
    <div className="file-uploader__container">
      <h3>Upload your file</h3>
      <div {...getRootProps()} className={dropzoneClassnames}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="dropzone__paragraph">Drop the files here ...</p>
        ) : (
          <p className="dropzone__paragraph">
            Drop some files here, or click to select files.
          </p>
        )}
      </div>
      {!!error && <p>{error}</p>}
    </div>
  );
}

FileUploader.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};
