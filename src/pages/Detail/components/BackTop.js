import React from 'react';
import { Button, Flex, Icon } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

const BackTop = ({backTopShow, setBackTopShow}) => {
  function backTop (e) {
    e.preventDefault();
    setBackTopShow(false);
    window.scrollTo(0, 0);
  }
  if (!backTopShow) {
    return null;
  } else {
    return (
      <Button 
        style={{
          position: 'fixed',
          right: '.2rem',
          bottom: '1.5rem',
          borderRadius: '50%',
          height: '.9rem',
          width: '.9rem',
          padding: '0',
          zIndex: '99'
        }}
        type="text"
        size="small"
        onClick={backTop}
      >
        <Flex align="center" justify="center" style={{height: '100%'}}>
          <Icon type={require('../../../icons/back-top.svg')} size="md" />
        </Flex>
      </Button>      
    );
  }
}

export default inject(({detail}) => ({
  backTopShow: detail.backTopShow,
  setBackTopShow: detail.setBackTopShow
}))(observer(BackTop));