import React, { Component } from 'react';
import './App.css';
import Navigation from './navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div id="app">
        <header>
          <Navigation />
        </header>
      </div>
    );
  }
}

export default App;
