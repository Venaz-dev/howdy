import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
        <Link className="navbar-brand hover-animation" to="/">Howdy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3 hover-animation" to="/chat">Chat</Link>
              <Link className="nav-item nav-link mr-3 hover-animation" to="/profile">Profile</Link>
              <button className="btn btn-primary mr-3 hover-animation" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link mr-3 hover-animation" to="/login">Sign In</Link>
              <Link 
                className="nav-item nav-link mr-3 hover-animation" 
                to="/signup"
                style={{color:'#007bff'}}>Sign Up
            </Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;