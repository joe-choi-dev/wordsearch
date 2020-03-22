/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import GridWords from './components/GridWords';
import GridWordsChecker from './components/GridWordsChecker';
import MUIAppBar from './components/MUIAppBar';

const styles = theme => ({
  contentHolder: {},
  canvasWrap: {
    backgroundColor: 'red',
    position: 'relative'
  },
  targets: {
    bottom: '0px', 
    position: 'absolute',
    left: '50%',
    'margin-left': '-200px',
    top: '10%',
    'margin-top': '400px',
    width: '400px',
  },
  targetList: {
    display: 'block',
    margin: '0 0 4px 0',
    padding: '0',
    'list-style-type': 'none',

    backgroundColor: 'red'
  },
  targetWord: {
    'font-size': '18px',
    padding: '0 6px',
    'line-height': '1.7em',

    backgroundColor: 'blue'
  }
});
  
@inject("gridStore") @observer
class GridContent extends React.Component {  

  constructor(props) {
    super(props);
    this.onClickContinue = this.onClickContinue.bind(this);
  }

  onClickContinue() {
    console.log("hello");
    this.props.gridStore.updateToNextWordSearchView();
  }

  render() {
    const { classes, gridStore }  = this.props;

    // console.log(gridStore.currentWord);
    console.log("render gridContent")

    return (
      <div className={classes.contentHolder}>
        <MUIAppBar/>
        <div className={classes.canvasWrap}>
          <GridWordsChecker/>
          <GridWords/>
        </div>
        <div className={classes.targets}>
          <p>Please find 1 word in the wordsearch that means "{gridStore.currentWord}"</p>
          <Button onClick={this.onClickContinue} variant="outlined" className={classes.continueButton} color="primary">
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridContent);