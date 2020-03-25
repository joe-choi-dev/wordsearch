/* eslint-disable */
import React from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import '../styles/GridWords.scss';
  
@inject("gridStore") @observer
class GridWords extends React.Component {  

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef(); 
  }

  componentDidMount() {
    this.props.gridStore.getWordSearchViews();
    const ctx = this.canvasRef ? this.canvasRef.current.getContext('2d') : {};
    this.drawGrid(ctx);
    // offset because of the margins
    const boundingRect = this.canvasRef.current.getBoundingClientRect();
    this.props.gridStore.offsetX = boundingRect.left; 
    this.props.gridStore.offsetY = boundingRect.top; 

    reaction(
      () => this.props.gridStore.currentWordView,
      () => {
        const ctx = this.canvasRef ? this.canvasRef.current.getContext('2d') : {};
        this.drawGrid(ctx);
      }
    );
  }

  drawGrid(ctx) {
    ctx.clearRect(0, 0, 400, 400);
    var letters = this.props.gridStore.currentWordView.character_grid.slice();  

    var rows=letters.length;
    var cols=letters[0].length;
    var cellWidth=400/rows;
    var cellHeight=400/cols;
    
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='700 14px Roboto';
    ctx.textAlign='center';
    ctx.textBaseline='middle';

    ctx.fillStyle='#3D3D3D';
    for(var row=0;row<rows;row++) {
      for(var col=0; col<cols;col++) {
        this.props.gridStore.coordinates.push({
          "x": col,
          "y": row,
          "canvasX": col*cellWidth+cellWidth/2,
          "canvasY": row*cellHeight+cellHeight/2
        })
        ctx.fillText(letters[row][col], col*cellWidth+cellWidth/2, row*cellHeight+cellHeight/2); 
      }
    }
  }

  render() {
    return (
        <canvas className="canvasWords"
            ref={this.canvasRef}
            width={400} 
            height={400}/>
    );
  }
}

export default GridWords;