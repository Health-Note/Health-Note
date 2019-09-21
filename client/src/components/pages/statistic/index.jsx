import React from 'react';
import Paper from '@material-ui/core/paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import NumberCard from './NumberCard';
import BarChart from './BarChart';
import SelectMember from './SelectMember';
import RadarChart from './RadarChart';

const data = [
  {
    percent: 'AD',
    'hot dog': 39,
    'hot dogColor': 'hsl(90, 70%, 50%)',
    burger: 146,
    burgerColor: 'hsl(33, 70%, 50%)',
    sandwich: 27,
    sandwichColor: 'hsl(285, 70%, 50%)',
    kebab: 184,
    kebabColor: 'hsl(308, 70%, 50%)',
    fries: 67,
    friesColor: 'hsl(217, 70%, 50%)',
    donut: 6,
    donutColor: 'hsl(120, 70%, 50%)',
  },
];

const radarData = [
  {
    taste: 'fruity',
    chardonay: 42,
    carmenere: 64,
    syrah: 92,
  },
  {
    taste: 'bitter',
    chardonay: 93,
    carmenere: 59,
    syrah: 28,
  },
  {
    taste: 'heavy',
    chardonay: 75,
    carmenere: 51,
    syrah: 107,
  },
  {
    taste: 'strong',
    chardonay: 85,
    carmenere: 109,
    syrah: 79,
  },
  {
    taste: 'sunny',
    chardonay: 103,
    carmenere: 44,
    syrah: 77,
  },
];

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '300px',
  },
}));

function Statistics({ member }) {
  // Routes.js에서 오는 member
  const classes = useStyles();
  return (
    <div>
      {member ? (
        <>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid container justify="center">
              <SelectMember />
            </Grid>
            <Grid item xs={2}>
              <NumberCard num={member.usedpt} text={'진행된PT'} />
            </Grid>
            <Grid item xs={2}>
              <NumberCard num={member.unusedpt} text={'남은PT'} />
            </Grid>
            <Grid item xs={3}>
              <NumberCard
                num={moment(member.endDate).format('YYYY년 MM월 DD일')}
                text={'맴버십종료일'}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <BarChart data={data} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <RadarChart data={radarData} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center">
            <Grid item xs={7}>
              <Paper className={classes.paper}>{'SDf'}</Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container justify="center">
          <SelectMember />
        </Grid>
      )}
    </div>
  );
}

export default Statistics;
