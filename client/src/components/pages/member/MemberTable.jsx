import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon } from 'antd';
import { MembersContext } from '../../../contexts/members.context';
import { AlertContext } from '../../../contexts/alert.context';

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '연락처',
    dataIndex: 'phonenum',
    key: 'phonenum',
  },
  {
    title: '성별',
    dataIndex: 'gender',
    key: 'gender',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.gender.length - b.gender.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '시작일',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
  },
  {
    title: '남은PT',
    dataIndex: 'unusedpt',
    key: 'unusedpt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.unusedpt - b.unusedpt,
  },
];

const MemberTable = ({ toggle }) => {
  const { members, error, getMember, removeMember } = useContext(
    MembersContext
  );
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [memberData, setMemberData] = useState([]);
  const [checkedRows, setChedckedRows] = useState([]);

  useEffect(() => {
    getMember();
  }, []);

  useEffect(() => {
    const data = members.map(member => {
      return {
        key: member.phonenum,
        name: member.name,
        gender: member.gender === 1 ? '남' : '여',
        phonenum: member.phonenum,
        start_date: member.start_date,
        unusedpt: member.unusedpt,
      };
    });
    setMemberData(data);
    console.log(members);
  }, [MembersContext, members]);

  const handleRemove = () => {
    removeMember(checkedRows);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      setChedckedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <Button onClick={toggle}>
        <Icon type="user-add" style={{ fontSize: '20px' }} />
        회원 등록
      </Button>
      <Button onClick={handleRemove}>
        <Icon type="user-delete" style={{ fontSize: '20px' }} />
        회원 삭제
      </Button>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={memberData}
        onChange={onChange}
      />
    </>
  );
};

export default MemberTable;
