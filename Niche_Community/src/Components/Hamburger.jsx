import React, { useState } from 'react';
import { NavLink } from "react-router";
import { useFirebase } from "../Context/Firebase";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { posts } = useFirebase();

  const communities = posts.length > 0 ? Array.from(new Set(posts.map(post => post.category))) : [];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Panel on the left side style with faster animation
  const panelStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '300px',
    backgroundColor: 'white',
    padding: '20px',
    color: 'rgba(0, 0, 0, 0.7)', // faded black text for the overlay panel
    animation: 'slideIn 0.3s ease-out', // updated duration
    zIndex: 1000,
  };

  // Background overlay for rest of the screen
  const bgOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: '300px',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 900,
  };

  // Bigger font for community names
  const communityStyle = { fontSize: '1.5rem', marginBottom: '10px' };

  // New style for each community container
  const communityContainerStyle = {
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px'
  };

  return (
    <div>
      <button 
        onClick={toggleMenu} 
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.8rem',
          color: '#dededf',
          padding: 0,
          outline: 'none'
        }}>
          {isOpen ? "X" : "☰"}
      </button>
      {isOpen && (
        <>
          <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 className="hamburger-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>Home</h2>
            </NavLink>
            <NavLink to="/community" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 className="hamburger-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>Community</h2>
            </NavLink>
            {posts.length === 0 ? (
              <div style={{ fontSize: '1.2rem', marginLeft: '20px', marginBottom: '10px' }}>
                No exciting communities for me to show right now
              </div>
            ) : (
              communities.map(community => (
                <h4 key={community} style={{ fontSize: '1.2rem', marginLeft: '20px', marginBottom: '10px' }}>
                  <NavLink to="/community" className="hamburger-sub-heading" style={{ textDecoration: 'none' }}>
                    {community}
                  </NavLink>
                </h4>
              ))
            )}
            <div className="posts-overlay">
              <h2 className="hamburger-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>Posts</h2>
              <NavLink to="/createPost" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 className="hamburger-sub-heading" style={{ fontSize: '1.2rem', marginLeft: '20px', marginBottom: '10px' }}>
                  <span style={{ marginRight: '4px' }}>+</span> Add Posts
                </h4>
              </NavLink>
            </div>
            <NavLink to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 className="hamburger-heading" style={{ fontSize: '2rem', marginTop: '20px', marginBottom: '10px' }}>Projects</h2>
            </NavLink>
            <NavLink to="/events" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 className="hamburger-heading" style={{ fontSize: '2rem', marginTop: '20px', marginBottom: '10px' }}>Events</h2>
            </NavLink>
          </div>
          <div style={bgOverlayStyle} onClick={toggleMenu} />
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(-100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            .hamburger-heading {
              transition: color 0.3s;
            }
            .hamburger-heading:hover {
              color: #3b82f6;
              cursor: pointer;
            }
            .hamburger-sub-heading {
              transition: color 0.3s;
              color: inherit;
            }
            .hamburger-sub-heading:hover {
              color: #3b82f6;
              cursor: pointer;
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default Hamburger;
