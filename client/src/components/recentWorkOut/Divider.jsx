import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    minWidth: 10,
    maxWidth: 150,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ exercise }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
  
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="h2">
          {exercise.day === 0 && "월요일"}
          {exercise.day === 1 && "화요일"}
          {exercise.day === 2 && "수요일"}
          {exercise.day === 3 && "목요일"}
          {exercise.day === 4 && "금요일"}
          {exercise.day === 5 && "토요일"}
          {exercise.day === 6 && "일요일"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {/* 해당 요일 운동을 보여줌 */}
          {exercise.kind.map(cv => (
            <div>
              {cv}
            </div>
          )) }
        </Typography>
        <Typography variant="body2" component="p">
          잘했음
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
   
  );
}