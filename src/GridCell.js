/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    cell: {
        'width': '10%',
        height: '100%',
        'font-size': '1.2em',
        'font-weight': 'bold',
        'text-align': 'center',
        border: '1px solid black',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
    }
});

class GridCell extends React.Component {  

    constructor(props) {
        super(props);
        this.onClickCell = this.onClickCell.bind(this);
    }
    
      onClickCell() {
        console.log("hello")
      }

    render() {
        const { classes, content, x, y }  = this.props;
        return (
            <div className={classes.cell} onClick={this.onClickCell}>{content}</div>
        );
    }
  }
  
export default withStyles(styles)(GridCell);