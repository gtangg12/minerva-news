import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";
import "../../utilities.css";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar-base">
        <div className="navbar-container">
          {this.props.userId ? (
            <>
              <div className="navbar-logo u-logo"> Minerva </div>
              <Link className="navbar-elm" to={`/${this.props.userId}`}> Home </Link>
              <Link className="navbar-elm" to={`/profile/${this.props.userId}`}> Profile </Link>
              <button
                onClick={this.props.handleLogout}
                className="u-cute-button navbar-login"
              >Logout</button>
            </>
          ) : (
            <>
              <div className="navbar-logo"/>
              <button
                onClick={this.props.handleLogin}
                className="u-cute-button navbar-login"
              >Login with Google</button>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default NavBar;