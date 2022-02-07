import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './index.css';
import {
  addUpdatedSubtitles,
  getCurrentFileName,
  getOriginalSubtitles,
} from '../subtitles';
import { HelperFooter } from './components';
import { parseSrt } from './services';

// TODO: Continue where you left off
// TODO: Update based on counter as ID

export function Editor() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

  const dispatch = useDispatch();

  const file = useSelector(getOriginalSubtitles);
  const name = useSelector(getCurrentFileName);

  const content = useMemo(() => parseSrt(file), [file]);
  const contentSize = useMemo(() => _.size(content), [content]);
  const fileName = useMemo(() => _.truncate(name, { length: 50 }), [name]);

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
      setCurrentIndex((prev) => prev + 1);

      dispatch(
        addUpdatedSubtitles({
          ...content[currentIndex],
          subtitle: _.isEmpty(currentInput)
            ? content[currentIndex].subtitle
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
          {currentIndex + 1} / {contentSize} lines
        </p>
      </div>
      <div className="editor__container">
        <p className="editor__current-line">{content[currentIndex].subtitle}</p>
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
