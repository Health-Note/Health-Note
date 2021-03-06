import React, { useContext, memo } from 'react';
import useToggle from '../../hooks/useToggle';
import EditMemberForm from './EditMemberForm';
import { MembersContext } from '../../contexts/members.context';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

const Member = ({ member }) => {
  const {
    id,
    name,
    phonenum,
    gender,
    startDate,
    endDate,
    totalPT,
    height,
  } = member;
  const { removeMember } = useContext(MembersContext);
  const [isEditing, toggle] = useToggle(false);

  const handleClick = () => {
    removeMember(phonenum);
  };

  return (
    <>
      {/* 커스텀 훅스의 toggle을 props로 전달해 줘서 자식 컴포넌트에서 토클을 가능하게 함 */}
      {isEditing && (
        <TableCell>
          <EditMemberForm
            member={{ ...member }}
            toggle={toggle}
            isEditing={isEditing}
          />
        </TableCell>
      )}
      <>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="right">{gender == 0 ? '여' : '남'}</TableCell>
        <TableCell align="right">{phonenum}</TableCell>
        <TableCell align="right">
          {moment(startDate).format('YY.MM.DD')}
        </TableCell>
        <TableCell align="right">
          {moment(endDate).format('YY.MM.DD')}
        </TableCell>
        <TableCell
          style={{ color: totalPT < 5 ? 'red' : 'blue' }}
          align="right"
        >
          {totalPT}
        </TableCell>
        <TableCell align="right">{height}</TableCell>
        <TableCell align="right">
          <IconButton arai-label="Edit" onClick={toggle}>
            <EditIcon />
          </IconButton>
          <IconButton arai-label="Delete" onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </>
    </>
  );
};

export default memo(Member);
