import React from './node_modules/react';
import Paper from './node_modules/@material-ui/core/Paper';
import { makeStyles } from './node_modules/@material-ui/core/styles';
import Tabs from './node_modules/@material-ui/core/Tabs';
import Tab from './node_modules/@material-ui/core/Tab';
import PhoneIcon from './node_modules/@material-ui/icons/Phone';
import FavoriteIcon from './node_modules/@material-ui/icons/Favorite';
import PersonPinIcon from './node_modules/@material-ui/icons/PersonPin';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PhoneIcon />} label="RECENTS" />
        <Tab icon={<FavoriteIcon />} label="FAVORITES" />
        <Tab icon={<PersonPinIcon />} label="NEARBY" />
      </Tabs>
    </Paper>
  );
}