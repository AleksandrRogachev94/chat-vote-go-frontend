import React from 'react';
import { Link } from 'react-router'

const Navbar = () => (
  <div>
    <Link to='/'>Home</Link> |
    <Link to='/login'>Login</Link> |
    <Link to='/signup'>Signup</Link>
  </div>
)

export default Navbar
