import React from 'react';
import { returnIcon, tabIcon } from '../assets';

function HelperFooter() {
  return (
    <div>
      <p className="editor__helper-footer">
        <b>TAB</b>&nbsp;
        <img alt="tab" src={tabIcon} />
        &nbsp; for new line &ensp;&ensp;<b>RETURN</b>&nbsp;
        <img alt="return" src={returnIcon} />
        &nbsp; for next line
      </p>
    </div>
  );
}

export default React.memo(HelperFooter);
