import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/home">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/blogs">
              Blogs <span className="sr-only">(current)</span>
            </Link>
            {!user && (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/profile">
                  {user.author}
                </Link>
                <Link className="nav-item nav-link" to="/logout">
                  <i class="fa fa-sign-out" aria-hidden="true">
                    Log-Out
                  </i>
                </Link>
              </React.Fragment>
            )}
            {!user && (
              <Link
                className="nav-link disabled"
                to=""
                tabIndex="-1"
                aria-disabled="true"
              >
                Passanger
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
