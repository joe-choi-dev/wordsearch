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

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUpOut = this.onMouseUpOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    // this.updateCanvas();
    this.drawGrid();
    // this.drawBoard();
  }

  //turn on the coloring hints
  onMouseDown(e){
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    //offset because of the margins
    const BB = this.refs.canvas.getBoundingClientRect();
    const offsetX=BB.left; 
    const offsetY=BB.top; 
  
    const startX=parseInt(e.clientX-offsetX);
    const startY=parseInt(e.clientY-offsetY);

    // console.log({ offsetX: offsetX, offsetY: offsetY });
    // console.log({ clientX: e.clientX, clientY: e.clientY });

    // console.log({ startX: startX, startY: startY });
  
    // Put your mousedown stuff here
    const isDown=true;
  }

  //turn on the coloring hints
  onMouseMove(e) {
    //if (isMouseDown) //then its dragging
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    //offset because of the margins
    const BB = this.refs.canvas.getBoundingClientRect();
    const offsetX=BB.left; 
    const offsetY=BB.top; 
  
    const startX=parseInt(e.clientX-offsetX);
    const startY=parseInt(e.clientY-offsetY);

    // console.log({ offsetX: offsetX, offsetY: offsetY });
    // console.log({ clientX: e.clientX, clientY: e.clientY });

    // console.log({ moveX: startX, moveY: startY });
  }

  //verify if its correct
  onMouseUpOut(e){
    // Put your mouseup stuff here
    const isDown=false;

    //offset because of the margins
    const BB = this.refs.canvas.getBoundingClientRect();
    const offsetX=BB.left; 
    const offsetY=BB.top; 
  
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
  
    const endX=parseInt(e.clientX-offsetX);
    const endY=parseInt(e.clientY-offsetY);
  
    // console.log({ endX: endX, endY: endY });
  }

  drawGrid() {
    const ctx = this.refs.canvas.getContext('2d');
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
      // console.log(row);
      // console.log(cols);
      // console.log(col*cellWidth+cellWidth/2);
      // console.log(row*cellHeight+cellHeight/2);
      // console.log(" ");
      ctx.fillText(letters[i], col*cellWidth+cellWidth/2, row*cellHeight+cellHeight/2); //20,20 -> 20,380
    }
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.lineCap = "round";
    ctx.lineWidth=20;
    ctx.font='14px Roboto';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.globalAlpha= 0.25; 
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 380);
    ctx.stroke();
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
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridContent);