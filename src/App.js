import React from 'react';
import GridContent from './GridContent';
import './App.css';
import {Provider} from 'mobx-react';
import * as store from './data/store.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider {...store}>
          <GridContent/>
        </Provider>
      </div>
    );
  }
}

export default App;