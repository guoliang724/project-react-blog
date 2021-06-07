import React, { Component } from "react";
import { Link } from "react-router-dom";



class NavBar extends Component {
  state = {
    toggle:"none"
  }
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand text-primary pl-5" to="/home">
          Guoliang's Personal Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-bar-toggle"
          aria-controls="nav-bar-toggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => { 
            this.setState({
              toggle:this.state.toggle==="none"?"block":"none"
            })
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
   
        <div className="collapse navbar-collapse" style={{display:this.state.toggle}} id="nav-bar-toggle">
          <div className="navbar-nav">
            <Link className="nav-link active pr-5" to="/blogs">
              Blogs <span className="sr-only">(current)</span>
            </Link>
            {!user && (
              <React.Fragment>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link " to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Link className="nav-link" to="/profile">
                  {user.author}
                </Link>
                <Link className="nav-link" to="/logout">
                  <i className="fa fa-sign-out" aria-hidden="true">
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
