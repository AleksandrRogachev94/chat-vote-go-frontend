import React from 'react';
import { Link } from 'react-router'
import chat from '../../public/chat.png'
import vote from '../../public/vote.png'

const Home = () => {
  return (
    <div className="home">
      <div className="home-logo">
        <h1>Welcome to<br/>Chat Vote Go</h1>
        <Link to="/signup" className="btn btn-primary">Join Now</Link>
      </div>
    </div>
  )
}

export default Home
