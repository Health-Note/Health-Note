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
        <Col sm={24} xl={10}>
          <MemberTable toggle={toggle}/>
        </Col>
        <Col sm={24} xl={5}>
          <MemberJoinForm3/>
        </Col>
      </Row>
    </>
  );
}

export default Member;
