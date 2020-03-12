/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridCell from './GridCell';
import GridRow from './GridRow';

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
  }
}));

export default function GridContent() {
  const classes = useStyles();

  return (
    <div className={classes.contentHolder}>
      <div className={classes.content}>
        <GridRow content={['b', 'c']}/>
      </div>
    </div>
  );
}
  