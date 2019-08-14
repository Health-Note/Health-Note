import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Member from './Member';
import { MembersContext } from '../../contexts/members.context';
import uuid from 'uuid/v4'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }));

function MembeList() {
    
    const classes = useStyles();
    const members  = useContext(MembersContext);
    return (
  
        <Paper>
            
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">이름</TableCell>
                        <TableCell align="right">성별</TableCell>
                        <TableCell align="right">연락처</TableCell>
                        <TableCell align="right">등록일</TableCell>
                        <TableCell align="right">마감일</TableCell>
                        <TableCell align="right">남은pt수</TableCell>
                        <TableCell align="right">키</TableCell>
                        <TableCell align="right">수정, 삭제</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                     {members.map((member, i) => (
                        <TableRow key={member.id}>
                            <Member  member={{...member}} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default MembeList;
