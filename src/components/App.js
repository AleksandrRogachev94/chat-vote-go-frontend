import React, { Component } from 'react';
import Navbar from './Navbar'
import FlashMessagesList from './flash/FlashMessagesList'

class App extends Component {
  render() {
    console.log("App Render")
    return (
      <div className="App">
        <Navbar />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

export default App;
