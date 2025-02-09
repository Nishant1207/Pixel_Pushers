import React, { useState } from "react";
import Hamburger from "../Components/Hamburger";
import { NavLink } from "react-router-dom"; 
import '../CSS/Navbar.css';
import { useFirebase } from "../Context/Firebase";

const Navbar = () => {
  const { searchQuery, setSearchQuery, isLoggedIn, logoutUser } = useFirebase();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="hamburger-wrapper">
          <Hamburger />
        </div>
        <NavLink to="/" className="logo">ConnectHub</NavLink>

        <div className="search-bar">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="nav-links-container open">
          <ul className="nav-links">
            <li><NavLink to="/community">Community</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
            <li><NavLink to="/redditfeed">Posts</NavLink></li>  {/* updated nav-link */}
          </ul>
          <div className="auth-buttons">
            { isLoggedIn ? (
                <button onClick={logoutUser} className="auth-btn logout-btn">Logout</button>
              ) : (
                <NavLink to="/login" className="auth-btn login-btn">Login</NavLink>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
