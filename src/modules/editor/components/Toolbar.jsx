import React from 'react';
import PropTypes from 'prop-types';
import { downloadIcon, resetIcon } from '../assets';
import HoverIcon from './HoverIcon';

function Toolbar({ onDownloadPress, onResetPress }) {
  return (
    <div className="editor__toolbar-container">
      <HoverIcon
        iconSrc={downloadIcon}
        label="Download file"
        onPress={onDownloadPress}
      />
      <HoverIcon
        iconSrc={resetIcon}
        label="Start over"
        onPress={onResetPress}
      />
    </div>
  );
}

Toolbar.propTypes = {
  onDownloadPress: PropTypes.func.isRequired,
  onResetPress: PropTypes.func.isRequired,
};

export default React.memo(Toolbar);
