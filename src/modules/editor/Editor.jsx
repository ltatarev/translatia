import PropTypes from 'prop-types';
import './index.css';

export function Editor({ file }) {
  console.log(typeof file);
  return (
    <div>
      <p>{file}</p>
    </div>
  );
}

Editor.propTypes = {
  file: PropTypes.string.isRequired,
};
