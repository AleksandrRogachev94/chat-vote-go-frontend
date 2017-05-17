import React, { Component } from 'react';
import Navbar from './Navbar'
import FlashMessagesList from './flash/FlashMessagesList'

class App extends Component {
  render() {
    console.log("App Render")
    return (
      <div className="App">

        <Navbar />

        <div className="content">
          <FlashMessagesList />
          {this.props.children}
        </div>

        <div className="footer">
          2017 Aleksandr Rogachev
        </div>
      </div>
    );
  }
}

export default App;
