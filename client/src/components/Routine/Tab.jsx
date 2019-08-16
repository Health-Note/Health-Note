import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function GroupedButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="center">
          <Grid item>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
              <Button>Three</Button>
              <Button>Three</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="center">
          
          
        
        </Grid>
      </Grid>
      
    </Grid>
  );
}
  // const exerciseData = {
  //       chest: ["벤치프레스", "인클라인벤치프레스", "디클라인벤치프레스", "팩덱플라이", "푸쉬업"],
  //       등: ["데드리프트", "풀업", "바벨로우"],
  //       하체: ["스쿼트", "레그익스텐션"],
  //       어깨: ["밀리터리프레스", "레터럴레이즈"],
  //       유산소: ["런닝", "자전거"]
  //    }


  //     <TabPanel value={value} index={0}>
  //       {exerciseData.chest.map(cv => {
  //         return <TextButton kind={cv} key={cv}/>
  //       })}
    