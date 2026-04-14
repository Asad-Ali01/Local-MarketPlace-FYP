import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router'
function Navbar() {
  return (
    <ul className='flex justify-between'>
      <div>

        <NavLink to="/" className={`cursor-pointer active:text-blue-700`} >Home</NavLink>
      </div>
      <div>

        <NavLink to="/register"><Button>Register</Button></NavLink>
        <NavLink to='/login'><Button>Login</Button></NavLink>
      </div>
    </ul>
  )
}

export default Navbar