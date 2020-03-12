/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  contentHolder: {
    padding: '10px',
    backgroundColor: '#78C800',
    width: 'fit-content',
    'border-radius': '25px',
    border: '1px solid black'
  },
  content: {
    width: '500px',
    height: '500px',
  },
  row: {
    'width': '100%',
    height: '10%',
    'display': 'flex'
  },
  cell: {
    'width': '10%',
    height: '100%',
    'font-size': '1.2em',
    'font-weight': 'bold',
    'text-align': 'center',
    border: '1px solid black',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center'
  }
}));

export default function GridContent() {
  const classes = useStyles();

  return (
    <div className={classes.contentHolder}>
       <div className={classes.content}>
         <div className={classes.row}>
            <div className={classes.cell}>a</div>
            <div className={classes.cell}>b</div>
            <div className={classes.cell}>a</div>
            <div className={classes.cell}>b</div>
            <div className={classes.cell}>a</div>
            <div className={classes.cell}>b</div>
            <div className={classes.cell}>a</div>
            <div className={classes.cell}>b</div>
            <div className={classes.cell}>a</div>
            <div className={classes.cell}>b</div>
         </div>
      </div>
    </div>
  );
}
