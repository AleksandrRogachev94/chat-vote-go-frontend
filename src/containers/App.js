import React, { Component } from 'react';
import Navbar from '../components/Navbar'

class App extends Component {
  render() {
    console.log("App Render")
    return (
      <div className="App">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
