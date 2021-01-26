import React from 'react';
import { Router, navigate } from "@reach/router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHighlighter } from '@fortawesome/free-solid-svg-icons'

import NavBar from "./modules/NavBar.jsx";
import Landing from "./pages/Landing.jsx"
import Home from "./pages/Home.jsx";
import Reading from "./pages/Reading.jsx";
import Profile from "./pages/Profile.jsx"
import NotFound from "./pages/NotFound.jsx";
import { get, post } from "../utilities.js";

import "../utilities.css";


library.add(faHighlighter)


class App extends React.Component {
  constructor(props) {
    super(props);
    const retrieved = localStorage.getItem("userCollections");
    console.log(this.state ? "ASKJD" : "BBB");
    this.state = {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      userPicture: localStorage.getItem("userPicture"),
      userCollections: retrieved ? JSON.parse(retrieved) : [],
    };
  }

  componentDidMount() {
    if (!this.state.userId) {
      get('/api/whoami').then((res) => {
        if (res.id) {
          this.setState({
            userId: res.id,
            userName: res.name,
            userPicture: res.picture,
            userCollections: res.collections,
          });
          localStorage.setItem("userId", res.id);
          localStorage.setItem("userName", res.name);
          localStorage.setItem("userPicture", res.picture);
          localStorage.setItem("userCollections", JSON.stringify(res.collections));
        }
      });
    }
  }

  handleLogin = (res) => {
    get('/api/login').then((res) => {
      navigate(res.request_uri);
    });
  };

  handleLogout = () => {
    this.setState({
      userId: undefined,
      userName: undefined,
      userPicture: undefined,
      userCollections: undefined,
    });
    localStorage.clear();
    post("/api/logout");
    navigate("/");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="app-page">
          {this.state.userId ? (
            <Router>
              <Home path="/" collections={this.state.userCollections} userId={this.state.userId}/>
              <Reading path="/reading/:newsId" userName={this.state.userName} userId={this.state.userId}/>
              <Profile path="/profile" userName={this.state.userName} userPicture={this.state.userPicture}/>
              <NotFound default />
            </Router>
          ):(
            <>
              <Landing default handleLogin={this.handleLogin}/>
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
