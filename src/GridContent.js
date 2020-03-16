/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
    backgroundColor: "#78C800",
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
  
class GridContent extends React.Component {  

  componentDidMount() {
    // this.updateCanvas();
    this.drawGrid();
    // this.drawBoard();
  }

  drawGrid() {
    const ctx = this.refs.canvas.getContext('2d');
    var rows=10;
    var cols=10;
    var cellWidth=40;
    var cellHeight=40;

    var letters = ['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
      .concat(['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b' ,'a']) 
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
      var row=parseInt(i/cols);
      var col=i-row*cols;
      console.log(row);
      console.log(cols);
      console.log(col*cellWidth+cellWidth/2);
      console.log(row*cellHeight+cellHeight/2);
      console.log(" ");
      ctx.fillText(letters[i], col*cellWidth+cellWidth/2, row*cellHeight+cellHeight/2); //20,20 -> 20,380
    }
  }

  drawOverlay() {
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.globalAlpha= 0.25; 
    ctx.moveTo(27, 27);
    ctx.lineTo(27, 175);
    ctx.stroke();
  }

  render() {
    const { classes }  = this.props;
    return (
      <div className={classes.contentHolder}>
        <div className={classes.canvasWrap}>
        {/* <canvas className={classes.overlay} ref="c" width={421} height={421}/> */}
        <canvas className={classes.canvas} ref="canvas" width={400} height={400}/>
        {/* <div className={classes.content}>
          <GridRow key={0} id={0} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
        </div> */}
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridContent);


//Scratch
// drawBoard(){
//   //grid width and height
//   var bw = 400;
//   var bh = 400;
//   //padding around grid
//   var p = 10;
//   //size of canvas
//   var cw = bw + (p*2) + 1;
//   var ch = bh + (p*2) + 1;

//   const context = this.refs.c.getContext('2d');
//   for (var x = 0; x <= bw; x += 40) {
//       context.moveTo(0.5 + x + p, p);
//       context.lineTo(0.5 + x + p, bh + p);
//   }

//   for (var x = 0; x <= bh; x += 40) {
//       context.moveTo(p, 0.5 + x + p);
//       context.lineTo(bw + p, 0.5 + x + p);
//   }

//   context.strokeStyle = "black";
//   context.stroke();
// }
