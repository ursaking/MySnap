import React, { Component } from "reactn";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Header from "./Header/Header";
import NavBar from "./Navbar/NavBar";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      event: {
        description: {
          text: ""
        },
        logo: {
          original: {
            url: ""
          }
        },
        name: {
          text: ""
        },
        start: {
          local: "",
          timezone: ""
        }
      }
    };
  }
  rac = re => {
    if (re == null) {
      return null;
    } else {
      return re.substr(0, 255);
    }
  };
  fullDes = e => {
    axios
      .get("https://www.eventbriteapi.com/v3/events/" + e.target.value + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer SX442T3UELN5AXIVHNX4"
        }
      })
      .then(res => {
        console.log(res.data);
        this.setGlobal({ FullDes: true });
        this.setState({ event: res.data });
      });
  };

  componentDidMount() {
    axios
      .get("https://www.eventbriteapi.com/v3/events/search/?token=SX442T3UELN5AXIVHNX4", {
        Authorization: "Bearer SX442T3UELN5AXIVHNX4"
      })
      .then(res => {
        this.setGlobal({ FullDes: false });
        this.setGlobal({ events: res.data.events });
      });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <div className="container-fluid back">
            <NavBar />
            {this.global.FullDes === false ? (
              <div>
                {this.global.events.map(event => (
                  <div className="Events border border-primary rounded" key={event.id}>
                    <div className="Event">
                      <p className="title">{event.name.text}</p>
                      <p className="description">{this.rac(event.description.text)}</p>
                      <img
                        src={event.logo !== null ? event.logo.original.url : false}
                        alt="{logo}"
                        className="img"
                      />
                      <button
                        className="btn btn-primary le-boutbout"
                        onClick={this.fullDes}
                        value={event.id}
                      >
                        En savoir +
                      </button>
                      <button
                        className="btn btn-primary butt"
                        onClick={this.fullDes}
                        value={event.id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="Events border border-primary rounded">
                  <div className="Full-Event">
                    <p className="title">{this.state.event.name.text}</p>
                    <p className="local">{this.state.event.start.local}</p>
                    <p className="timezone">{this.state.event.start.timezone}</p>
                    <img src={this.state.event.logo.original.url} alt="{logo}" className="Img" />
                    <button type="submit" className="btn btn-primary but">
                      Organisez une sortie !
                    </button>
                    <p className="Desc">{this.state.event.description.text}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
