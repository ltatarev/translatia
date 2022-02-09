import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function HoverIcon({ onPress, iconSrc, label }) {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const labelClassName = classNames(
    'editor__toolbar-button-text',
    { 'editor__toolbar-button-text-hover': hover },
  );

  return (
    <div className="editor__toolbar-container">
      <div
        className="editor__toolbar-button"
        role="button"
        tabIndex={0}
        onClick={onPress}
        onKeyPress={onPress}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <img alt="Download" height="20" src={iconSrc} />
        <p className={labelClassName}>{label}</p>
      </div>
    </div>
  );
}

HoverIcon.propTypes = {
  iconSrc: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default React.memo(HoverIcon);
