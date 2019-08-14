import React from 'react';
import PieChart from '../statistic/PieChart';
import Paper from '@material-ui/core/paper';
import { makeStyles } from '@material-ui/core/styles';
import { width } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import NumberCard from "../statistic/NumberCard";
import BarChart from '../statistic/BarChart'
import SelectMember from '../statistic/SelectMember';
import moment from 'moment';
import BMIChart from '../statistic/BMIChart'

const data = [
  {
    "country": "AD",
    "hot dog": 39,
    "hot dogColor": "hsl(90, 70%, 50%)",
    "burger": 146,
    "burgerColor": "hsl(33, 70%, 50%)",
    "sandwich": 27,
    "sandwichColor": "hsl(285, 70%, 50%)",
    "kebab": 184,
    "kebabColor": "hsl(308, 70%, 50%)",
    "fries": 67,
    "friesColor": "hsl(217, 70%, 50%)",
    "donut": 6,
    "donutColor": "hsl(120, 70%, 50%)"
  },
]

const BMIData = [
  {
    "id": "japan",
    "color": "hsl(206, 70%, 50%)",
    "data": [
      {
        "x": "1",
        "y": 1
      },
      {
        "x": "2",
        "y": 30
      },
      {
        "x": "3",
        "y": 79
      },
      {
        "x": "4",
        "y": 5
      },
      {
        "x": "5",
        "y": 56
      },
      {
        "x": "6",
        "y": 71
      },
      {
        "x": "7",
        "y": 67
      },
      {
        "x": "8",
        "y": 9
      },
      {
        "x": "9",
        "y": 55
      },
      {
        "x": "10",
        "y": 16
      },
      {
        "x": "11",
        "y": 96
      },
      {
        "x": "12",
        "y": 70
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(257, 70%, 50%)",
    "data": [
      {
        "x": "1",
        "y": 30
      },
      {
        "x": "2",
        "y": 60
      },
      {
        "x": "3",
        "y": 60
      },
      {
        "x": "4",
        "y": 59
      },
      {
        "x": "5",
        "y": 59
      },
      {
        "x": "6",
        "y": 59
      },
      {
        "x": "7",
        "y": 55
      },
      {
        "x": "8",
        "y": 55
      },
      {
        "x": "9",
        "y": 52
      },
      {
        "x": "10",
        "y": 53
      },
      {
        "x": "11",
        "y": 56
      },
      {
        "x": "12",
        "y": 55
      }
    ]
  },
]

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(0),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: "300px",
  },
}));

function Statistics({member}) { //Routes.js에서 오는 member
    const classes = useStyles();
    return (
      <div>
      {member ? 
      <>
          <Grid
          container spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
          >
            <Grid container
             justify="center">
                <SelectMember />
            </Grid>
                <Grid item xs={2} >
                  <NumberCard num={member.usedpt} text={"진행된PT"}/>
                </Grid>
                <Grid item xs={2} >
                  <NumberCard num={member.unusedpt} text={"남은PT"}/>
                </Grid>
                <Grid item xs={3} >
                  <NumberCard num={moment(member.endDate).format("YYYY년 MM월 DD일")} text={"맴버십종료일"}/>
                </Grid>
            </Grid>
            <Grid container justify="center" spacing={2} >
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                <BarChart data={data} />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <BarChart data={data} />
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={2} justify="center">
                <Grid item xs={7}>
                  <Paper className={classes.paper}>
                    <BMIChart data={BMIData}/>
                    {"SDf"}
                  </Paper>
                </Grid>
            </Grid>
          </>
      :    <Grid container justify="center" >
            <SelectMember />
          </Grid>}
        </div>
        )
      }

      export default Statistics;