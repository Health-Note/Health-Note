import React, { useContext, useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import { DatePicker } from '@material-ui/pickers';

import SearchSelect from '../../context/molecules/SearchSelect';
import CustomLineChart from '../../context/molecules/CustomLineChart';
import CustomRadarChart from '../../context/molecules/CustomRadarChart';
import RangeMonthPicker from '../../context/molecules/RangeMonthPicker';
import {useSelector} from "react-redux";

function TabPanel(props) {
  const { children, value, tabValue, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== tabValue}
      id={`simple-tabpanel-${tabValue}`}
      aria-labelledby={`simple-tab-${tabValue}`}
      {...other}
    >
      {value === tabValue && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paperRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px 2px 20px',
  },
  chartWrap: {
    width: '100%',
    height: 300,
  },
}));

function a11yProps(tabValue) {
  return {
    id: `statics-tab-${tabValue}`,
    'aria-controls': `statics-tabpanel-${tabValue}`,
  };
}

const initFilter = {
  startDate: new Date(),
  endDate: new Date(),
};

function Statistics({ member: curMember, history }) {
  // Routes.js에서 오는 member
  // let memberIndex = 0;
  const { members } = useSelector(state => state.member);
  if (typeof curMember === 'undefined') {
    curMember = members[0];
  }
  const classes = useStyles();
  const { list, memberIndex } = useMemo(() => {
    let memberIndex = 0;
    const list = members.map((member, index) => {
      if (member.id === curMember.id) {
        memberIndex = index;
      }
      return {
        label: member.name,
        index,
        phoneNum: member.phoneNum,
      };
    });

    return { list, memberIndex };
  }, [members, curMember]);
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = useState({ ...initFilter });

  useEffect(() => {
    setFilter({ ...initFilter });
  }, [curMember]);

  // let memberIndex = 0;
  // if (typeof curMember === 'undefined') {
  //   curMember = members[0];
  // }
  // const list = members.map((member, index) => {
  //   if (member.id === curMember.id) {
  //     memberIndex = index;
  //   }
  //   return {
  //     label: member.name,
  //     index,
  //     phoneNum: member.phoneNum,
  //   };
  // });

  /**
   *  맴버 변경
   */
  const handleChangeMember = selectObj => {
    // setMemberIndex(selectObj.index);
    history.push(`/statistic/${selectObj.label}`);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = ({ name, value }) => {
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="h-Statistic">
      <Paper className={classes.paperRoot}>
        <SearchSelect
          label="회원"
          placeholder="이름"
          list={list}
          value={list[memberIndex]}
          onChange={handleChangeMember}
        />
        <span> 회원님</span>
      </Paper>

      <AppBar position="static">
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="차트" {...a11yProps(0)} />
          <Tab label="메모" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} tabValue={0}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <RangeMonthPicker
              startDate={filter.startDate}
              endDate={filter.endDate}
              onChange={handleDateChange}
            />
            <div className={classes.chartWrap}>
              <CustomLineChart />
            </div>
          </Grid>
          <Grid item xs="auto">
            <div className={classes.chartWrap}>
              <CustomRadarChart />
            </div>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} tabValue={1}>
        Item Two
      </TabPanel>
    </div>
  );
}

export default withRouter(Statistics);
