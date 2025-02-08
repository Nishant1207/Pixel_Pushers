import React, { useState } from "react";
import { NavLink } from "react-router";
import '../CSS/Navbar.css';
import { useFirebase } from "../Context/Firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useFirebase();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">ConnectHub</NavLink>

        <div className="search-bar">
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </div>

        <div className={`nav-links-container ${isOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><NavLink to="/community">Community</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
          </ul>
          <div className="auth-buttons">
            <NavLink to='/login'>Login</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
