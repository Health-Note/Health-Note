import React from 'react';
import MemberJoinForm3 from '../../context/organisms/MemberJoinForm3';
import MemberTable from './MemberTable';
import { Row, Col } from 'antd';
import useToggle from '../../../hooks/useToggle';

function Member() {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <Row justify="center">
        <Col md={24} lg={24} xl={12}>
          <MemberTable toggle={toggle}/>
        </Col>
        <Col md={22} lg={24} xl={7}>
          <MemberJoinForm3/>
        </Col>
      </Row>
    </>
  );
}

export default Member;
