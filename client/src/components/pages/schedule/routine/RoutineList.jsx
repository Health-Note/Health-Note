import React from 'react';
import { Card, Avatar, InputNumber , Row, Tag, Table, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';

const { Meta } = Card;
const RoutineList = ({ routines }) => {

  const columns = [
    {
      title: '부위',
      dataIndex: 'targetName',
      key: 'targetName',
      render: text => <a>{text}</a>,
    },
    {
      title: '운동이름',
      dataIndex: 'exerciseName',
      key: 'exerciseName',
    },
    {
      title: '세트수',
      render: () => (
        <>
        <InputNumber  style={{width: '60px'}}/>
        </>
      )
    },
    {
      title: '반복수',
      render: () => (
        <>
          <InputNumber  type={'number'} style={{width: '60px'}}/>
        </>
      )
    },
    {
      title: '부위',
      key: uuid(),
      dataIndex: 'targetName',
      render: (text) => (
        <>
          <Tag color={'red'} key={uuid()}>
            {text}
          </Tag>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={routines}/>
    </>
  );


};

export default RoutineList;
