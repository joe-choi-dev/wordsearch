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
    opacity: 0.8
    // backgroundColor: 'blue'
  }
});

@inject("gridStore") @observer
class GridWordSolutions extends React.Component {  

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef(); 
  }

  componentDidUpdate() {
    const ctx = this.canvasRef ? this.canvasRef.current.getContext('2d') : {};
    this.props.gridStore.foundSolutions && this.resetCanvas(ctx);

    for (let item of this.props.gridStore.foundSolutions) {
        const {start, end} = this.props.gridStore;

        //don't redraw
        if (!this.props.gridStore.drawnSolutions.includes(item)) {
          this.drawHighlights(ctx, start.canvasX, start.canvasY, end.canvasX, end.canvasY);
          this.props.gridStore.drawnSolutions.push(item);
        }
    }
  }

  drawHighlights(ctx, startX, startY, endX, endY) {
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='14px Roboto';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.globalAlpha= 0.25;
    ctx.fillStyle='blue';

    (this.props.gridStore.foundSolutions.length == 1) && ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  resetCanvas(ctx) {
    ctx.clearRect(0, 0, 400, 400);
  }

  render() {
    const { classes }  = this.props;
    for (let item of this.props.gridStore.foundSolutions) console.log('solutions : ', item)

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

export default withStyles(styles)(GridWordSolutions); 