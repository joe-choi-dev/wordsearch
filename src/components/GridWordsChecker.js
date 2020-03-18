/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  canvas: {
    margin: '10px',
    position: 'absolute',
    top: 0,
    left: 0,
    'z-index': 1,
    opacity: 0.5
  }
});
  
@inject("gridStore") @observer
class GridWordsChecker extends React.Component {  

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUpOut = this.onMouseUpOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.context = null // this will be initializaed in componentDidMount()
  }

  componentDidMount() {
    this.context = this.refs.canvas.getContext("2d")
    
    //offset because of the margins
    const boundingRect = this.refs.canvas.getBoundingClientRect();
    this.props.gridStore.offsetX = boundingRect.left; 
    this.props.gridStore.offsetY = boundingRect.top; 
  }

  //turn on the coloring hints
  onMouseDown(e){
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    const {offsetX, offsetY} = this.props.gridStore;
  
    const start = this.props.gridStore.getNearestCoordinates(parseInt(e.clientX-offsetX),  parseInt(e.clientY-offsetY));
    if (start.canvasX && start.canvasY) {
      this.props.gridStore.start = start;
    }
  
    // Put your mousedown stuff here
    this.props.gridStore.isDown = true;
  }

  //turn on the coloring hints
  onMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    this.resetCanvas();

    const {offsetX, offsetY} = this.props.gridStore;
  
    if (this.props.gridStore.isDown && this.props.gridStore.start) {

      const currX = parseInt(e.clientX-offsetX);
      const currY = parseInt(e.clientY-offsetY);
      
      const {x, y, canvasX, canvasY} = this.props.gridStore.getNearestCoordinates(currX, currY);
      if (canvasX && canvasY && this.props.gridStore.isValidPath(x, y, this.props.gridStore.start.x, this.props.gridStore.start.y)) {
        this.drawHighlights(this.props.gridStore.start.canvasX, 
          this.props.gridStore.start.canvasY, 
          canvasX, 
          canvasY);
      }
    }
  }

  //verify if its correct
  onMouseUpOut(e){

    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    this.resetCanvas();

    this.props.gridStore.isDown = false;
    const {offsetX, offsetY} = this.props.gridStore;
  
    const endX = parseInt(e.clientX-offsetX);
    const endY = parseInt(e.clientY-offsetY);

    this.props.gridStore.end = this.props.gridStore.getNearestCoordinates(endX, endY);
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

  render() {
    const { classes }  = this.props;
    return (
        <canvas className={classes.canvas} 
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUpOut}
            onMouseOut={this.onMouseUpOut}
            onMouseMove={this.onMouseMove}
            ref="canvas" 
            width={400} 
            height={400}/>
    );
  }
}

export default withStyles(styles)(GridWordsChecker);