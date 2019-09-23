import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Icon } from 'antd';
import { MembersContext } from '../../../contexts/members.context';

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
    dataIndex: 'phoneNum',
    key: 'phoneNum',
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
    title: '결제한PT수',
    dataIndex: 'totalPT',
    key: 'totalPT',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.totalPT - b.totalPT,
  },
  {
    title: '진행된PT수',
    dataIndex: 'usedPT',
    key: 'usedPT',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.usedPT - b.usedPT,
  },
];

const MemberTable = ({ toggle }) => {
  const { members, error, getMember, removeMember } = useContext(
    MembersContext
  );

  const [memberData, setMemberData] = useState([]);
  const [checkedRows, setChedckedRows] = useState([]);

  useEffect(() => {
    getMember();
  }, []);

  useEffect(() => {
    const memberRow = members.map(member => {
      return {
        key: member.PhoneNum,
        name: member.Name,
        gender: member.Gender === 1 ? '남' : '여',
        phoneNum: member.PhoneNum,
        usedPT: member.UsedPT,
        totalPT: member.TotalPT,
      };
    });
    setMemberData(memberRow);
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
