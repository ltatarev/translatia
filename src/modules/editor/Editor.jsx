import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './index.css';
import {
  addUpdatedSubtitles,
  getCurrentFileData,
  getOriginalSubtitles,
} from '../subtitles';
import { HelperFooter } from './components';
import { parseSrt } from './services';

export function Editor() {
  const [currentInput, setCurrentInput] = useState('');

  const dispatch = useDispatch();

  const file = useSelector(getOriginalSubtitles);
  const { shortFileName: fileName, totalLines, currentLine } = useSelector(
    getCurrentFileData,
  );

  const content = useMemo(() => parseSrt(file), [file]);

  const handleInputChange = useCallback(
    (event) => setCurrentInput(event.target.value),
    [],
  );

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
            ? content[currentLine].subtitle
            : currentInput,
        }),
      );
      setCurrentInput('');
    }
  }

  return (
    <div>
      <div className="editor__title-row">
        <p className="editor__title">{fileName}</p>
        <p className="editor__lines">
          {currentLine + 1} / {totalLines} lines
        </p>
      </div>
      <div className="editor__container">
        <p className="editor__current-line">{content[currentLine].subtitle}</p>
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
  );
}
