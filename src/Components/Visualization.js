import React, { Component } from "react";
import "../Styles/Visualization.css";
import ComparisionComponent from "./ComparisionComponent";
import CrimeParticipantsComponent from "./CrimeParticipantsComponent";
import GunDeathsComponent from "./GunDeathsComponent";
import YearStatisticsComponent from "./YearStatisticsComponent";
import state_names from "..Constants/statesData.js";
import { state_names } from "../Constants/statesData";

let rawData = [];
const Chart = window.Chart;
const Highcharts = window.Highcharts;

let state_names = state_names;

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_state1: "California",
      input_state2: "Florida",
      statesData: [],
    };
  }

  componentDidMount() {
    rawData = this.props.data;
    this.processData();
  }

  processData() {
    let date;
    let state;
    let ageobj = { 0: 0 };
    let statesData = {};
    let genderData = { M: 0, F: 0, U: 0 };
    let prefix;
    let gunsData = { stolen: 0, unknown: 0, legal: 0 };
    let deathsData = {};
    let ageData = { "0-9": 0, "10-18": 0, "19-25": 0, "25-64": 0, "64+": 0 };
    rawData.forEach((element) => {
      date = element.date.slice(-4);
      if (deathsData.hasOwnProperty(date)) {
        deathsData[date] = deathsData[date] + parseInt(element.n_killed);
      } else {
        deathsData[date] = parseInt(element.n_killed);
      }

      state = element.state;
      if (statesData.hasOwnProperty(state)) {
        statesData[state][date] =
          statesData[state][date] + parseInt(element.n_killed);
      } else {
        let temp = new Object();
        temp["2013"] = 0;
        temp["2014"] = 0;
        temp["2015"] = 0;
        temp["2016"] = 0;
        temp["2017"] = 0;
        temp["2018"] = 0;
        temp[date] = parseInt(element.n_killed);
        statesData[state] = temp;
      }

      var age = element.participant_age.split("||");
      age.forEach((a) => {
        prefix = a.substring(3, 5);
        let t = parseInt(prefix);
        if (t <= 9) {
          ageData["0-9"] = ageData["0-9"] + 1;
        } else if (t > 9 && t <= 18) {
          ageData["10-18"] = ageData["10-18"] + 1;
        } else if (t > 18 && t <= 25) {
          ageData["19-25"] = ageData["19-25"] + 1;
        } else if (t > 25 && t <= 64) {
          ageData["25-64"] = ageData["25-64"] + 1;
        } else if (t > 64) {
          ageData["64+"] = ageData["64+"] + 1;
        } else {
        }
        if (ageobj.hasOwnProperty(prefix)) {
          ageobj[prefix] = parseInt(ageobj[prefix]) + 1;
        } else {
          ageobj[prefix] = parseInt("1");
        }
      });
      var gender = element.participant_gender.split("||");
      gender.forEach((gen) => {
        prefix = gen.substring(3, 4);
        if (genderData.hasOwnProperty(prefix)) {
          genderData[prefix] = parseInt(genderData[prefix]) + 1;
        } else {
          genderData["U"] = parseInt(genderData["U"]) + 1;
        }
      });

      var guns = element.gun_stolen.split("||");
      guns.forEach((gun) => {
        prefix = gun.substring(3);
        if (prefix.includes("Stolen")) {
          gunsData["stolen"] = parseInt(gunsData["stolen"]) + 1;
        } else if (prefix.includes("Not")) {
          gunsData["legal"] = parseInt(gunsData["legal"]) + 1;
        } else {
          gunsData["unknown"] = parseInt(gunsData["unknown"]) + 1;
        }
      });
    });
  }

  render() {
    return (
      <div id="maindiv">
        <ComparisionComponent
          state_names={state_names}
          statesData={statesData}
        ></ComparisionComponent>
        <GunDeathsComponent deathsData={deathsData}></GunDeathsComponent>
        <CrimeParticipantsComponent
          ageData={ageData}
        ></CrimeParticipantsComponent>
        <YearStatisticsComponent gunsData={gunsData}></YearStatisticsComponent>
      </div>
    );
  }
}

export default Visualization;
