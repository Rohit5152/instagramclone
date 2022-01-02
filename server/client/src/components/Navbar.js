import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate =useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li key="1"><Link className='resize' to="/create">Create</Link></li>,
        <li key="2"><Link className='resize' to="/profile">Profile</Link></li>,
        <li key="4"><Link className='resize' to="/myfollowingpost">Explore</Link></li>,
        <li key="5">
          <button className="btn #c62828 red darken-1"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              navigate('/signin')
            }}
          >
            Logout
          </button>
        </li>
      ]
    }
    else {
      return [
        <li key="3"><Link to="/signin">Login</Link></li>,
        <li key="4"><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left resize">Instagram</Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}
