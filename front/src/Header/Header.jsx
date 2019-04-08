import React, { Component } from "react";
import axios from "axios";
import logo from "./logoevent.jpg";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <header className="border border-dark rounded">
          <div className="container">
            <img src={logo} alt="{logo}" className="logo" />
            <button className="btn btn-primary icon_user">
              <i className="fas fa-user" />
            </button>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
