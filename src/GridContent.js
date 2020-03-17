/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import GridCell from './GridCell';
import GridRow from './GridRow';

const styles = theme => ({
  contentHolder: {},
  canvasWrap: {
    // padding: '10px',
    // width: '500px',
    // height: '500px',
    // backgroundColor: '#78C800',
    // 'border-radius': '25px',
    position: 'relative'
  },
  canvas: {
    margin: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
    'z-index': 1,
    opacity: 0.5
    // backgroundColor: "yellow",
  },
  canvasWords: {
    margin: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
    'z-index': 0,
    backgroundColor: "#78C800"
  },
  overlay: {
    margin: '10px',
    position: 'absolute',
    backgroundColor: "yellow",
    top: 0,
    left: 0,
    'z-index': 0
  }
});
  
@inject("gridStore") @observer
class GridContent extends React.Component {  

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUpOut = this.onMouseUpOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.context = null // this will be initializaed in componentDidMount()

  }

  componentDidMount() {
    this.context = this.refs.canvas.getContext("2d")
    // this.updateCanvas();
    this.drawGrid();
    
    //offset because of the margins
    const boundingRect = this.refs.canvas.getBoundingClientRect();
    this.props.gridStore.offsetX = boundingRect.left; 
    this.props.gridStore.offsetY = boundingRect.top; 
    // this.drawBoard();
  }

  //turn on the coloring hints
  onMouseDown(e){
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    const {offsetX, offsetY} = this.props.gridStore;
  
    const {xCoor, yCoor} = this.props.gridStore.getNearestCoordinates(parseInt(e.clientX-offsetX),  parseInt(e.clientY-offsetY));
    if (xCoor && yCoor) {
      this.props.gridStore.startX = xCoor;
      this.props.gridStore.startY = yCoor;
      console.log({ xCoor: xCoor, yCoor: yCoor });
    }

    // console.log({ offsetX: offsetX, offsetY: offsetY });
    // console.log({ clientX: e.clientX, clientY: e.clientY });
  
    // Put your mousedown stuff here
    this.props.gridStore.isDown = true;
  }

  drawHighlights(startX, startY, endX, endY) {
    const ctx = this.context;
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='14px Roboto';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.globalAlpha= 0.25; 

    ctx.beginPath(); //need to ensure canvas doens't still think ur drawing
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  resetCanvas() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  //turn on the coloring hints
  onMouseMove(e) {
    //if (isMouseDown) //then its dragging
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    this.resetCanvas();

    const {offsetX, offsetY} = this.props.gridStore;
  
    if (this.props.gridStore.isDown && this.props.gridStore.startX && this.props.gridStore.startY) {

      this.props.gridStore.currentX = parseInt(e.clientX-offsetX);
      this.props.gridStore.currentY = parseInt(e.clientY-offsetY);
      
      const {xCoor, yCoor} = this.props.gridStore.getNearestCoordinates(this.props.gridStore.currentX, this.props.gridStore.currentY );
      if (xCoor && yCoor) {
        console.log('coord: ' + xCoor + ', ' + yCoor);
        this.drawHighlights(this.props.gridStore.startX, 
          this.props.gridStore.startY, 
          xCoor, 
          yCoor);
      }

      // this.props.gridStore.startX && console.log({ startX: this.props.gridStore.startX, startY: this.props.gridStore.startY });
      // this.props.gridStore.startX && console.log({ moveX: this.props.gridStore.currentX, moveY: this.props.gridStore.currentY });
    }

    // console.log({ offsetX: offsetX, offsetY: offsetY });
    // console.log({ clientX: e.clientX, clientY: e.clientY });
  }

  //verify if its correct
  onMouseUpOut(e){

    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    this.props.gridStore.isDown = false;
    const {offsetX, offsetY} = this.props.gridStore;
  
    this.props.gridStore.endX = parseInt(e.clientX-offsetX);
    this.props.gridStore.endY = parseInt(e.clientY-offsetY);
  }

  drawGrid() {
    const ctx = this.refs.canvasWords.getContext('2d');
    var rows=10;
    var cols=10;
    var cellWidth=40;
    var cellHeight=40;

    var letters = ['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']
      .concat(['o', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['o', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['d', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a'])
    letters = letters.map(function(x){ return x.toUpperCase() })
    
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='14px Roboto';
    ctx.textAlign='center';
    ctx.textBaseline='middle';

    ctx.fillStyle='black';
    for(var i=0;i<letters.length;i++){
      var row=parseInt(i/cols); //rowNumber
      var col=i-row*cols;

      // console.log(col);
      // console.log(col*cellWidth+cellWidth/2);
      // console.log(row);
      // console.log(row*cellHeight+cellHeight/2);
      // console.log(" ");

      this.props.gridStore.coordinates.push({
        "x": col,
        "y": row,
        "xCoor": col*cellWidth+cellWidth/2,
        "yCoor": row*cellHeight+cellHeight/2
      })

      ctx.fillText(letters[i], col*cellWidth+cellWidth/2, row*cellHeight+cellHeight/2); //20,20 -> 20,380
    }
  }

  render() {
    const { classes }  = this.props;
    return (
      <div className={classes.contentHolder}>
        <div className={classes.canvasWrap}>
          <canvas className={classes.canvas} 
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUpOut}
            onMouseOut={this.onMouseUpOut}
            onMouseMove={this.onMouseMove}
            ref="canvas" 
            width={400} 
            height={400}/>
          <canvas className={classes.canvasWords} 
            ref="canvasWords" 
            width={400} 
            height={400}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridContent);