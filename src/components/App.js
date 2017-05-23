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

        <footer id="footer">
          2017 Aleksandr Rogachev
        </footer>
      </div>
    );
  }
}

export default App;
