import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PhoneForm from './components/PhoneForm/PhoneForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Phone Form Component</h1>
        </header>
        <p className="App-intro">
          
        </p>
        <PhoneForm />
      </div>
    );
  }
}

export default App;
