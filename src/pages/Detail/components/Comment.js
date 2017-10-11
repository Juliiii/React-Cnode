import React from 'react';
import { Button } from 'antd-mobile';

const Comment = ({onComment}) => {
  function comment () {
    onComment();
  }
  return (
    <Button 
      style={{
        position: 'fixed',
        right: '.2rem',
        bottom: '.4rem',
        borderRadius: '50%',
        height: '.9rem',
        width: '.9rem',
        lineHeight: '.9rem',
        textAlign: 'center',
        padding: '0',
        zIndex: '99'
      }}
      type="primary"
      size="small"
      onClick={comment}
    >评论
    </Button>   
  );
}

export default Comment;