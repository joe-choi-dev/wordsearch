/* eslint-disable */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import '../styles/GridWordSolutions.scss';

@inject("gridStore") @observer
class GridWordSolutions extends React.Component {  

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef(); 
  }

  componentDidMount() {
    reaction(
      () => this.props.gridStore.foundSolutions.length,
      () => {
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
    );
  }

  drawHighlights(ctx, startX, startY, endX, endY) {
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='14px Ubuntu';
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
    return (
        <canvas className="canvasSolutions"
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

export default GridWordSolutions; 