import React, { Component } from "react";
import "../Styles/Header.css";
import Visualization from "./Visualization";
import Ranking from "./Ranking";
import Report from "./Report";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: 1,
      isLoaded: false,
      rawData: [],
      shouldLoad: false,
    };
  }

  //Executes when component loads for the first time
  componentDidMount() {
    //fetching the data from backend
    fetch("https://goutham-server.herokuapp.com/data")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result[0]);
          this.setState({
            isLoaded: true,
            rawData: result,
            shouldLoad: false,
          });
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        this.setState({
          shouldLoad: true,
          isLoaded: true,
        });
      });
  }

  loadNewComponent(e, input) {
    // to prevent page from refreshing
    e.preventDefault();
    // loading varaible components based on the user input
    if (input === 1) {
      this.setState({
        loadPage: 1,
      });
    } else if (input === 2) {
      this.setState({
        loadPage: 2,
      });
    } else if (input === 3) {
      this.setState({
        loadPage: 3,
      });
    } else {
    }
  }

  render() {
    return (
      <div>
        <nav>
          <ul id="head">
            <li class="items" onClick={(e) => this.loadNewComponent(e, 1)}>
              Visualizations
            </li>
            <li class="items" onClick={(e) => this.loadNewComponent(e, 2)}>
              Rankings
            </li>
            <li class="items" onClick={(e) => this.loadNewComponent(e, 3)}>
              Report
            </li>
          </ul>
        </nav>
        <div id="childcomponents">
          {this.state.loadPage === 1 ? (
            <Visualization data={this.state.rawData}></Visualization>
          ) : this.state.loadPage === 2 ? (
            <Ranking data={this.state.rawData}></Ranking>
          ) : (
            <Report></Report>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
