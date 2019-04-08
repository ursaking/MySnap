import React, { Component } from "reactn";
import { BrowserRouter as Router } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import axios from "axios";
import "./NavBar.css";
import { debounce } from "../Debounce";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      place: "",
      cat: "",
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://www.eventbriteapi.com/v3/categories/?token=SX442T3UELN5AXIVHNX4", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer SX442T3UELN5AXIVHNX4"
        }
      })
      .then(res => {
        this.setGlobal({ categories: res.data.categories });
      });
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  onChange = event => {
    this.setGlobal({ FullDes: false });
    this.setState({ place: event.target.value });
    this.update();
  };
  ChangeSelect = eve => {
    this.setGlobal({ FullDes: false });
    this.setState({ cat: eve.target.value });
    this.update2();
  };
  update2 = debounce(() => {
    axios
      .get("https://www.eventbriteapi.com/v3/events/search/", {
        params: {
          categories: this.state.cat,
          token: "SX442T3UELN5AXIVHNX4"
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer SX442T3UELN5AXIVHNX4"
        }
      })
      .then(res => {
        this.setGlobal({ events: res.data.events });
      });
  }, 100);
  update = debounce(() => {
    axios
      .get("https://www.eventbriteapi.com/v3/events/search/", {
        params: {
          "location.address": this.state.place,
          token: "SX442T3UELN5AXIVHNX4"
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer SX442T3UELN5AXIVHNX4"
        }
      })
      .then(res => {
        this.setGlobal({ events: res.data.events });
      });
  }, 400);
  render() {
    return (
      <Router>
        <React.Fragment>
          <div className="container-fluid back">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="Nav">
              <DropdownToggle caret>Menu</DropdownToggle>
              <DropdownMenu>
                <p className="filtre">Filtres</p>
                <select className="selector" onChange={this.ChangeSelect}>
                  {this.global.categories.map(categorie => (
                    <option key={categorie.id} value={categorie.id}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
                <input type="text" placeholder="Lieux" className="places" />
              </DropdownMenu>
            </Dropdown>
            <div className="App border border-primary col-sm-2">
              <p className="filter">Filtres</p>
              <select className="selecto" onChange={this.ChangeSelect}>
                {this.global.categories.map(categorie => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Lieux"
                className="place"
                value={this.state.place}
                onChange={this.onChange}
              />
            </div>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default NavBar;
