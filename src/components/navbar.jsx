import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isLoggedIn, logout }) => {
  return (
    <header>
      <h1>[photo app name here]</h1>
      <nav className="nav">
        {
          isLoggedIn ?
            (
              <React.Fragment>
                <button onClick={logout}>Logout</button>
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
