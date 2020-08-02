import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useIsMount } from '../../../hooks/useIsMount';
import {
  getMemberRequestAction, removeMemberRequestAction, clearTargetAction
} from '../../../reducers/members.reducer'

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
  },
  {
    title: '결제한PT수',
    dataIndex: 'totalPT',
    key: 'totalPT',
    sorter: (a, b) => a.totalPT - b.totalPT,
  },
  {
    title: '진행된PT수',
    dataIndex: 'usedPT',
    key: 'usedPT',
    sorter: (a, b) => a.usedPT - b.usedPT,
  },
];

const MemberTable = ({ toggle }) => {
  const isMount = useIsMount();
  const { targetMember, error, members } = useSelector(state => state.member);
  const dispatch = useDispatch();
  const [memberData, setMemberData] = useState([]);
  const [checkedRows, setChedckedRows] = useState([]);

  useEffect(() => {
    dispatch(getMemberRequestAction());
  }, []);

  useEffect(() => {
    if (targetMember && targetMember !== "deleted") {
      dispatch(clearTargetAction());
    } 
  }, [targetMember]);

  useEffect(() => {
    if(targetMember === "deleted"){
    }
  }, [targetMember]);


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
  }, [members]);

  const handleRemove = () => {
    dispatch(removeMemberRequestAction(checkedRows));
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
      {/*<Button onClick={toggle}>*/}
      {/*  <UserAddOutlined style={{ fontSize: '20px' }} />*/}
      {/*  회원 등록*/}
      {/*</Button>*/}
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
