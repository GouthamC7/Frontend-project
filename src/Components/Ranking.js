import React, { Component } from "react";
import "../Styles/Ranking.css";
import IncidentsRankingComponent from "./IncidentsRankingComponent";
import RiskRankingComponent from "./RiskRankingComponent";
let sortedData = [];
let Chart = window.Chart;
class Ranking extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    sortedData = this.props.data;
    //sorting the data based on n_killed field
    sortedData.sort(function (a, b) {
      return b.n_killed - a.n_killed;
    });
  }

  render() {
    return (
      <div>
        <IncidentsRankingComponent
          sortedData={sortedData}
        ></IncidentsRankingComponent>
        <RiskRankingComponent sortedData={sortedData}></RiskRankingComponent>
      </div>
    );
  }
}

export default Ranking;
