import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import { MembersContext } from '../../../contexts/members.context';
import { AlertContext } from '../../../contexts/alert.context';
import { useIsMount } from '../../../hooks/useIsMount';

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};

const columns = [
  {
    title: '이름',
    dataIndex: 'memberName',
    key: 'memberName',
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
  const isMount = useIsMount();
  
  const { members, error, getMember, removeMember, targetMember, clearErrors, clearTarget } = useContext(
    MembersContext
  );
  const { setAlert } = useContext(AlertContext);

  const [memberData, setMemberData] = useState([]);
  const [checkedRows, setChedckedRows] = useState([]);

  useEffect(() => {
    getMember();
  }, []);

  useEffect(() => {
    if (targetMember && targetMember !== "deleted") {
      setAlert(targetMember + '회원님이 목록에 추가되었습니다.', 'success', uuid());
      clearTarget();
    } 
  }, [targetMember]);

  useEffect(() => {
    if(targetMember === "deleted"){
      setAlert('삭제에 성공했습니다.', 'success', uuid());
    }
  }, [targetMember]);

  useEffect(() => {
    if (error) {
      setAlert(error, 'error', uuid());
      clearErrors();
    }
  }, [error]);

  useEffect(() => {
    const memberRow = members.map(member => {
      return {
        key: member.id,
        id: member.id,
        memberName: member.memberName,
        gender: member.gender === 1 ? '남' : '여',
        phoneNum: member.phoneNum,
        usedPT: member.usedPT,
        totalPT: member.totalPT,
      };
    });
    setMemberData(memberRow);
  }, [MembersContext, members]);

  const handleRemove = () => {
    removeMember(checkedRows);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   'selectedRows: ',
      //   selectedRows
      // );
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
        <UserAddOutlined style={{ fontSize: '20px' }} />
        회원 등록
      </Button>
      <Button onClick={handleRemove}>
        <UserDeleteOutlined style={{ fontSize: '20px' }} />
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
