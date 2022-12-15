import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './index.css';
import {
  addUpdatedSubtitles,
  exportSrt,
  getCurrentFileData,
  getOriginalSubtitles,
  reset,
} from '../subtitles';
import { HelperFooter, Toolbar } from './components';
import { downloadFile } from './services';

export function Editor() {
  const [currentInput, setCurrentInput] = useState('');

  const dispatch = useDispatch();

  const content = useSelector(getOriginalSubtitles);
  const {
    shortFileName: fileName,
    totalLines,
    currentLine,
  } = useSelector(getCurrentFileData);

  const subtitle = content[currentLine]?.subtitle;

  const handleInputChange = useCallback(
    (event) => setCurrentInput(event.target.value),
    [],
  );

  const handleResetPress = useCallback(() => dispatch(reset()), [dispatch]);
  const handleDownloadPress = useCallback(() => {
    const {
      payload: { fileName: name, subtitles },
    } = dispatch(exportSrt());

    return downloadFile(name, subtitles);
  }, [dispatch]);

  function handleKeyDown(e) {
    const { key } = e;

    if (key === 'Tab') {
      e.preventDefault();
      setCurrentInput((prev) => `${prev}\n`);
    }

    if (key === 'Enter') {
      e.preventDefault();

      dispatch(
        addUpdatedSubtitles({
          ...content[currentLine],
          subtitle: _.isEmpty(currentInput)
            ? content[currentLine]?.subtitle
            : currentInput,
        }),
      );
      setCurrentInput('');
    }
  }

  // TODO: Handle last line
  if (totalLines <= currentLine) {
    return (
      <>
        <div
          className="flex items-center justify-center hover:cursor-pointer"
          role="button"
          tabIndex="0"
          onClick={handleResetPress}
          onKeyPress={handleResetPress}
        >
          <p className="mt-10 w-fit rounded-xl bg-neutral-300 py-2 px-4 text-center text-sm font-bold text-slate-500 hover:bg-neutral-400 hover:text-slate-100">
            Start over?
          </p>
        </div>
        <div
          className="flex items-center justify-center hover:cursor-pointer"
          role="button"
          tabIndex="-1"
          onClick={handleDownloadPress}
          onKeyPress={handleDownloadPress}
        >
          <p className="mt-10 w-fit rounded-xl bg-neutral-600 py-2 px-4 text-center text-sm font-bold text-slate-50 hover:bg-neutral-400 hover:text-slate-100">
            Download
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="editor__main-container">
      <div>
        <div className="editor__title-row">
          <p className="editor__title">{fileName}</p>
          <p className="editor__lines">
            {currentLine + 1} / {totalLines} lines
          </p>
        </div>
        <div className="editor__container">
          <p className="editor__current-line">{subtitle}</p>
          <textarea
            id="editor__current-input"
            name="subtitleInput"
            placeholder="Type translation here..."
            rows="1"
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <HelperFooter />
      </div>
      <Toolbar
        onDownloadPress={handleDownloadPress}
        onResetPress={handleResetPress}
      />
    </div>
  );
}
