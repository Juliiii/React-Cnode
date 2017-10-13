import React from 'react';
import { Link } from 'react-router';

export default ({src = 'https://avatars3.githubusercontent.com/u/8694508?v=4&s=72', size = '140', isCircle = true, loginname}) => {
  return (
    <Link to={`/user/${loginname}`}>
      <img
        src={src}
        style={{
          height: `${size / 100}rem`,
          width: `${size / 100}rem`,
          borderRadius: isCircle ? '50%' : 'none',
          borderColor: 'rgb(221, 221, 221)',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        alt="avatar"
      />
    </Link>
  )
};


