import * as React from 'react';
import './App.css';

import Header from './Header'
class App extends React.Component<{}, null> {

  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Header/>
          </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
