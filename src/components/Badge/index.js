import React from 'react';
import { Badge } from 'antd-mobile'

export default ({top, good}) => {
  return (
    <div>
      {good && <Badge text="hot" />}
      {top && <Badge text="top" style={{marginLeft: '8px'}} />}
    </div>
  );
}
