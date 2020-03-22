/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
  canvas: {
    position: 'absolute',
    left: '50%',
    'margin-left': '-200px',
    top: '5%',
    'margin-top': '20px',
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

    this.canvasRef = React.createRef(); 
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

    const ctx = this.canvasRef ? this.canvasRef.current.getContext('2d') : {};
    this.resetCanvas(ctx);

    const {offsetX, offsetY} = this.props.gridStore;
  
    if (this.props.gridStore.isDown && this.props.gridStore.start) {

      const currX = parseInt(e.clientX-offsetX);
      const currY = parseInt(e.clientY-offsetY);
      
      const {x, y, canvasX, canvasY} = this.props.gridStore.getNearestCoordinates(currX, currY);
      if (canvasX && canvasY && this.props.gridStore.isValidPath(x, y, this.props.gridStore.start.x, this.props.gridStore.start.y)) {
        this.drawHighlights(ctx,
          this.props.gridStore.start.canvasX, 
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

    const ctx = this.canvasRef ? this.canvasRef.current.getContext('2d') : {};
    this.resetCanvas(ctx);

    this.props.gridStore.isDown = false;
    const {offsetX, offsetY} = this.props.gridStore;
  
    const endX = parseInt(e.clientX-offsetX);
    const endY = parseInt(e.clientY-offsetY);

    this.props.gridStore.end = this.props.gridStore.getNearestCoordinates(endX, endY);
  }

  drawHighlights(ctx, startX, startY, endX, endY) {
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

  resetCanvas(ctx) {
    ctx.clearRect(0, 0, 400, 400);
  }

  render() {
    const { classes }  = this.props;
    return (
        <canvas className={classes.canvas} 
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUpOut}
            onMouseOut={this.onMouseUpOut}
            onMouseMove={this.onMouseMove}
            ref={this.canvasRef}
            width={400} 
            height={400}/>
    );
  }
}

export default withStyles(styles)(GridWordsChecker);