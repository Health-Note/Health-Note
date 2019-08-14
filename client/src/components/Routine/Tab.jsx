import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextButton from './ExerciseButton';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  // 모든 운동 종류들을 받아온다
  // useEffect(() => {
    
  // }, [])

  // (개발메모) ajax와 연결되면 삭제해도 됨.
  const exerciseData = {
        chest: ["벤치프레스", "인클라인벤치프레스", "디클라인벤치프레스", "팩덱플라이", "푸쉬업"],
        등: ["데드리프트", "풀업", "바벨로우"],
        하체: ["스쿼트", "레그익스텐션"],
        어깨: ["밀리터리프레스", "레터럴레이즈"],
        유산소: ["런닝", "자전거"]
     }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="가슴" {...a11yProps(0)} />
          <Tab label="등" {...a11yProps(1)} />
          <Tab label="하체" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {exerciseData.chest.map(cv => {
          return <TextButton kind={cv} key={cv}/>
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        등
      </TabPanel>
      <TabPanel value={value} index={2}>
        하체
      </TabPanel>
      <TabPanel value={value} index={3}>
        어깨
      </TabPanel>
      <TabPanel value={value} index={4}>
        이두
      </TabPanel>
      <TabPanel value={value} index={5}>
        삼두
      </TabPanel>
      <TabPanel value={value} index={6}>
        유산소
      </TabPanel>
    </div>
  );
}