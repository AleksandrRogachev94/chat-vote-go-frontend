import React from 'react';
import Navbar from './Navbar'
import FlashMessagesList from './flash/FlashMessagesList'

class App extends React.Component {

  render() {
    console.log("App Render")
    return (
      <div className="App">

        <Navbar />

        <div className="container">
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
