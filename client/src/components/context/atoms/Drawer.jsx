import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

const MyDrawer = props => {
  const [visible, seetVisible] = useState(false);

  const onClose = () => {
    props.setDrawer(false);
  };

  return (
    <div>
      <Drawer
        title={props.title}
        placement="right"
        closable={true}
        mask={false}
        maskClosable={false}
        onClose={onClose}
        visible={props.drawerBoolean}
        width={400}
        zIndex={0}
      >
        {props.children}
      </Drawer>
    </div>
  );
};

export default MyDrawer;
