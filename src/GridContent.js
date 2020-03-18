/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import GridWords from './components/GridWords';
import GridWordsChecker from './components/GridWordsChecker';

const styles = theme => ({
  contentHolder: {},
  canvasWrap: {
    backgroundColor: 'red',
    position: 'relative'
  }
});
  
@inject("gridStore") @observer
class GridContent extends React.Component {  

  render() {
    const { classes }  = this.props;
    return (
      <div className={classes.contentHolder}>
        <div className={classes.canvasWrap}>
          <GridWordsChecker/>
          <GridWords/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridContent);