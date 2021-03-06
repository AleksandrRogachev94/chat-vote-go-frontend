import React from 'react';
import Navbar from './Navbar'
import FlashMessagesList from './flash/FlashMessagesList'

class App extends React.Component {

  render() {
    return (
      <div className="App">

        <Navbar />

        <div className="main">
          <FlashMessagesList />
          {this.props.children}
        </div>

        <footer id="footer">
          &copy; 2017 Aleksandr Rogachev
        </footer>
      </div>
    );
  }
}

export default App;
