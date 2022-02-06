import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './index.css';
import { HelperFooter } from './components';
import { parseSrt } from './services';

export function Editor({ file, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

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

Editor.propTypes = {
  file: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
