/* eslint-disable no-undef */
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './index.css';

export function FileUploader({ onFileUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setLoading(true);

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = _.noop();
        reader.onerror = () => setError('File reading has failed');
        reader.onload = () => {
          const fileStr = reader.result;

          setLoading(false);
          return onFileUploaded(file.name, fileStr);
        };

        reader.readAsText(file);
      });
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  if (loading) {
    return (
      <div className="file-uploader__container">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="file-uploader__container">
      <h3>Upload your file</h3>
      <div {...getRootProps()} className="dropzone__container">
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
