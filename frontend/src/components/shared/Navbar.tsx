import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router'
function Navbar() {
  return (
    <ul>
        <li>Home</li>
        <NavLink to="/register"><Button>Register</Button></NavLink>
        <NavLink to='/login'><Button>Login</Button></NavLink>
    </ul>
  )
}

export default Navbar