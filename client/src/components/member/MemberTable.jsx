import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Icon, } from "antd";
import { MembersContext } from "../../contexts/members.context";
import { AlertContext } from "../../contexts/alert.context";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

const columns = [
  {
    title: "이름",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "연락처",
    dataIndex: "phonenum",
    key: "phonenum"
  },
  {
    title: "성별",
    dataIndex: "gender",
    key: "gender",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.gender.length - b.gender.length,
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "시작일",
    dataIndex: "start_date",
    key: "start_date",
    sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date)
  },
  {
    title: "남은PT",
    dataIndex: "unusedpt",
    key: "unusedpt",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.unusedpt - b.unusedpt
  }
];

const MemberTable = () => {
  const { members, error, removeMember } = useContext(MembersContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [memberData, setMemberData] = useState([]);
  const [checkedRows, setChedckedRows] = useState([]);

  useEffect(() => {
    const data = members.map(member => {
      return {
        key: member.phonenum,
        name: member.name,
        gender: member.gender === 1 ? "남" : "여",
        phonenum: member.phonenum,
        start_date: member.start_date,
        unusedpt: member.unusedpt
      };
    });
    setMemberData(data);
  }, [members]);

  useEffect(() => {
    if (error) {
      setAlert(error);
    }
    // eslint-disable-next-line
  }, [error]);

  const handleRemove = () => {
    console.log("리무브", checkedRows)
    removeMember(checkedRows);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setChedckedRows(selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <Button><Icon type="user-add" style={{ fontSize: '20px'}}/>회원 등록</Button>
      <Button onClick={handleRemove}><Icon type="user-delete" style={{ fontSize: '20px'}} />회원 삭제</Button>
      <Table rowSelection={rowSelection} columns={columns} dataSource={memberData} onChange={onChange} />
    </>
  );
};

export default MemberTable;
