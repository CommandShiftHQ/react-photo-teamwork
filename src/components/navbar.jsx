import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn }) => {
  return (
    <header>
      <h1>[photo app name here]</h1>
      <nav className="nav">
        {
          isLoggedIn ?
            (
              <React.Fragment>
                <div>
                  <Link to="/gallery">
                    Gallery
                  </Link>
                </div>
                <div>
                  <Link to="/upload">
                    Upload image
                  </Link>
                </div>
              </React.Fragment>
            ) :
            (
              <React.Fragment>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/sign-up">
                  Sign-Up
                </Link>
              </React.Fragment>
            )
        }
      </nav>
    </header>
  );
};

export default NavBar;
