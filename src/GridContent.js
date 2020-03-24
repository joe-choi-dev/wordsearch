/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import { inject, observer } from 'mobx-react';
import GridWords from './components/GridWords';
import GridWordsChecker from './components/GridWordsChecker';
import GridWordSolutions from './components/GridWordSolutions';
import MaterialAppBar from './components/MaterialAppBar';
import './styles/GridContent.scss';
  
@inject("gridStore") @observer
class GridContent extends React.Component {  

  constructor(props) {
    super(props);
    this.onClickContinue = this.onClickContinue.bind(this);
  }

  onClickContinue() {
    this.props.gridStore.loadNextWordView();
  }

  render() {
    const { gridStore }  = this.props;

    const instruction = (gridStore.totalCurrentSolutions > 1) ?
      `Please find ${gridStore.totalCurrentSolutions} words in the wordsearch that mean "${gridStore.currentWord}"` 
      : `Please find ${gridStore.totalCurrentSolutions} word in the wordsearch that means "${gridStore.currentWord}"`;

    return (
      <div className="contentHolder">
        <MaterialAppBar/>
        {(!gridStore.isComplete) ? (
          <div>
            <div className="canvasWrap">
              <GridWordsChecker/>
              <GridWordSolutions/>
              <GridWords/>
            </div>
            <div className="targets">
              <p>{instruction}</p>
              <Button onClick={this.onClickContinue} variant="outlined" className="continueButton" color="primary" disabled={!gridStore.foundAllSolutions}>
                Continue
              </Button>
            </div>
          </div>
        ) : <h2>Complete!</h2>}
      </div>
    );
  }
}

export default GridContent;