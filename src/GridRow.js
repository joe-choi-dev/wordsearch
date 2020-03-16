import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridCell from './GridCell';

const styles = theme => ({
    row: {
        'width': '100%',
        height: '10%',
        'display': 'flex'
    },
});

class GridRow extends React.Component {  
    render() {
        const { classes, content = ['a'], id }  = this.props;

        let cells = [];
        content.forEach((value, i) => {
          cells.push(
            <GridCell content={content[i]} key={i} x={i} y={id}/>
          );
        });

        return (
            <div className={classes.row}>
                { cells }
            </div>
        );
    }
  }
  
  export default withStyles(styles)(GridRow);