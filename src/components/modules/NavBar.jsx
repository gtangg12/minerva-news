import React from "react";
import { Link } from "@reach/router";
import { ProfileModal } from "./BootstrapModels.jsx";
import "../../utilities.css";
import "./NavBar.css";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
    }
  }

  setshowProfile = (bool) => {
    this.setState({showProfile: bool});
  }

  render() {
    return (
      <div className="navbar-base">
        <div className="navbar-container">
          {this.props.userId ? (
            <>
              <div className="navbar-logo u-logo"> Minerva </div>
              <Link className="navbar-elm" to={"/"}> Home </Link>
              <button className="navbar-btn" onClick={() => {
                this.setshowProfile(true);
              }}>
                <svg id="ProfileIcon" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><g><path d="m9 10c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"/></g><g><path d="m8.5 21h-8c-.276 0-.5-.224-.5-.5v-4c0-2.481 2.019-4.5 4.5-4.5h6c.276 0 .5.224.5.5s-.224.5-.5.5h-6c-1.93 0-3.5 1.57-3.5 3.5v3.5h7.5c.276 0 .5.224.5.5s-.224.5-.5.5z"/></g><g><g><path d="m17 20c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5zm0-4c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"/></g><g><path d="m17.797 24h-1.595c-.516 0-.944-.387-.995-.901l-.127-1.271c-.303-.135-.592-.303-.865-.503l-1.168.527c-.469.214-1.02.035-1.277-.412l-.797-1.381c-.258-.447-.136-1.011.282-1.312l1.029-.74c-.02-.155-.034-.327-.034-.507s.014-.353.034-.507l-1.029-.74c-.418-.301-.54-.865-.282-1.312l.797-1.381c.258-.447.806-.624 1.277-.412l1.168.527c.273-.2.562-.368.865-.503l.127-1.271c.051-.513.479-.9.995-.9h1.595c.516 0 .944.387.995.901l.127 1.271c.304.135.593.304.865.503l1.168-.527c.471-.211 1.02-.034 1.277.412l.797 1.381c.258.447.136 1.011-.282 1.312l-1.029.74c.02.155.034.327.034.507s-.014.353-.034.507l1.029.74c.418.301.54.865.282 1.312l-.796 1.38c-.258.446-.805.625-1.277.412l-1.168-.527c-.273.2-.562.368-.865.503l-.128 1.272c-.051.513-.479.9-.995.9zm-3.512-3.755c.115 0 .229.04.321.117.339.284.714.501 1.113.647.18.066.307.229.326.42l.158 1.571h1.595l.157-1.571c.019-.191.146-.354.326-.42.399-.146.774-.364 1.113-.647.148-.123.352-.151.526-.072l1.444.652.797-1.381-1.278-.918c-.156-.112-.233-.304-.201-.493.037-.211.067-.426.067-.648s-.03-.437-.067-.648c-.033-.189.045-.38.201-.493l1.278-.918-.797-1.381-1.444.651c-.175.079-.379.051-.527-.072-.338-.284-.712-.501-1.113-.647-.18-.066-.307-.229-.326-.42l-.157-1.574h-1.595l-.157 1.571c-.019.191-.146.354-.326.42-.399.146-.774.364-1.113.647-.147.123-.351.152-.526.072l-1.444-.652-.797 1.381 1.278.918c.156.112.233.304.201.493-.037.211-.067.426-.067.648s.03.437.067.648c.033.189-.045.38-.201.493l-1.278.918.797 1.381 1.444-.651c.066-.028.135-.042.205-.042z"/></g></g></svg>
              </button>
              <ProfileModal
               show={this.state.showProfile}
               setshow={this.setshowProfile}
               userName={this.props.userName}
               userEmail={this.props.userEmail}
               userPicture={this.props.userPicture}
              />
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
