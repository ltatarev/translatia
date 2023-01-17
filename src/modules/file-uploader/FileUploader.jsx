import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FILE_NAME, getExampleFile } from '../../../examples';

export function FileUploader({ onFileUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExampleClick = useCallback(() => {
    getExampleFile().then((text) => onFileUploaded(FILE_NAME, text));
  }, [onFileUploaded]);

  const handleDrop = useCallback(
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

        reader.readAsText(file, 'windows-1250');
      });
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  if (loading) {
    return (
      <div className="m-auto flex flex-col place-content-center justify-center rounded-xl bg-slate-50 p-10 text-center hover:cursor-pointer hover:bg-white hover:transition-all hover:ease-in-out">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="m-auto flex flex-col place-content-center justify-center rounded-xl bg-slate-50 p-10 text-center hover:cursor-pointer hover:bg-white hover:transition-all hover:ease-in-out">
        <h3 className="font-bold">Upload your file</h3>
        <div {...getRootProps()} className="p-10">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-sm">Drop the files here ...</p>
          ) : (
            <p className="text-sm">
              Drop some files here, or click to select files.
            </p>
          )}
        </div>

        {!!error && <p>{error}</p>}
      </div>
      <div
        className="flex items-center justify-center hover:cursor-pointer"
        role="button"
        tabIndex="0"
        onClick={handleExampleClick}
        onKeyPress={handleExampleClick}
      >
        <p className="mt-10 w-fit rounded-xl bg-neutral-300 py-2 px-4 text-center text-sm font-bold text-slate-500 hover:bg-neutral-400 hover:text-slate-100">
          Try example file
        </p>
      </div>
    </>
  );
}

FileUploader.propTypes = {
  onFileUploaded: PropTypes.func.isRequired,
};
