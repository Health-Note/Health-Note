import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  listItem: {
    borderBottom: '1px solid #efefef',
  },
  itemText: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function InteractiveList({
  makeAppearBtnLabel = 'Enable secondary text',
  title,
  list,
  listMaxHeight,
  handleDelete,
  // scrollRef,
  listScrollTop,
}) {
  const classes = useStyles();
  const scrollRef = React.createRef();
  const [secondary, setSecondary] = React.useState(false);

  React.useEffect(() => {
    if (listScrollTop === 'top') {
      scrollRef.current.scrollTop = 0;
    } else {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [list]);

  return (
    <div className={clsx('h-InteractiveList')}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={secondary}
              onChange={event => setSecondary(event.target.checked)}
              value="secondary"
            />
          }
          label={makeAppearBtnLabel}
        />
      </FormGroup>
      <div
        className={classes.demo}
        style={{ maxHeight: listMaxHeight }}
        ref={scrollRef}
      >
        <List>
          {list.map((item, index) => (
            <ListItem className={classes.listItem} key={index}>
              <DoneIcon />
              <ListItemText
                className={classes.itemText}
                primary={item.contents}
                secondary={secondary ? item.secondary : null}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={event => handleDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
