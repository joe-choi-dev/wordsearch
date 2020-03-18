/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  canvasWords: {
    margin: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
    'z-index': 0,
    backgroundColor: "#78C800"
  }
});
  
@inject("gridStore") @observer
class GridWords extends React.Component {  

  constructor(props) {
    super(props);
    this.context = null // this will be initializaed in componentDidMount()
  }

  componentDidMount() {
    this.props.gridStore.getWordSearchViews();

    this.context = this.refs.canvasWords.getContext("2d");
    this.drawGrid();
    //offset because of the margins
    const boundingRect = this.refs.canvasWords.getBoundingClientRect();
    this.props.gridStore.offsetX = boundingRect.left; 
    this.props.gridStore.offsetY = boundingRect.top; 
  }

  drawGrid() {
    const ctx = this.refs.canvasWords.getContext('2d');
    var rows=8;
    var cols=8;
    var cellWidth=50;
    var cellHeight=50;

    var letters = this.props.gridStore.letters.character_grid[0]
      .concat(this.props.gridStore.letters.character_grid[1])
      .concat(this.props.gridStore.letters.character_grid[2])
      .concat(this.props.gridStore.letters.character_grid[3])
      .concat(this.props.gridStore.letters.character_grid[4])
      .concat(this.props.gridStore.letters.character_grid[5])
      .concat(this.props.gridStore.letters.character_grid[6])
      .concat(this.props.gridStore.letters.character_grid[7]);
      
    letters = letters.map(function(x){ return x.toUpperCase() });
    
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='100 14px Roboto';
    ctx.textAlign='center';
    ctx.textBaseline='middle';

    ctx.fillStyle='black';
    for(var i=0;i<letters.length;i++){
      var row=parseInt(i/cols); //rowNumber
      var col=i-row*cols;
      this.props.gridStore.coordinates.push({
        "x": col,
        "y": row,
        "canvasX": col*cellWidth+cellWidth/2,
        "canvasY": row*cellHeight+cellHeight/2
      })
      ctx.fillText(letters[i], col*cellWidth+cellWidth/2, row*cellHeight+cellHeight/2); //20,20 -> 20,380
    }
  }

  render() {
    const { classes }  = this.props;
    return (
        <canvas className={classes.canvasWords} 
            ref="canvasWords" 
            width={400} 
            height={400}/>
    );
  }
}

export default withStyles(styles)(GridWords);