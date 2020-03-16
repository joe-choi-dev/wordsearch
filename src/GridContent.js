/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridCell from './GridCell';
import GridRow from './GridRow';

const styles = theme => ({
  contentHolder: {
    padding: '10px',
    backgroundColor: '#78C800',
    width: 'fit-content',
    'border-radius': '25px'
  },
  content: {
    width: '500px',
    height: '500px'
  }
});
  
class GridContent extends React.Component {  

  render() {
    const { classes }  = this.props;
    return (
      <div className={classes.contentHolder}>
        <div className={classes.content}>
          <GridRow key={0} id={0} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={1} id={1} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={2} id={2} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={3} id={3} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={4} id={4} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={5} id={5} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={6} id={6} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={7} id={7} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={8} id={8} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
          <GridRow key={9} id={9} content={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GridContent);