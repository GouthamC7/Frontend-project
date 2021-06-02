import React, { Component } from "react";
import "../Styles/Visualization.css";
import ComparisionComponent from "./ComparisionComponent";
import CrimeParticipantsComponent from "./CrimeParticipantsComponent";
import GunDeathsComponent from "./GunDeathsComponent";
import YearStatisticsComponent from "./YearStatisticsComponent";
import state_names from "..Constants/states.js";
import { state_names } from "../Constants/states";

let data = [];
const Chart = window.Chart;
const Highcharts = window.Highcharts;

let state_names = state_names;

class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      input_state1: "California",
      input_state2: "Florida",
      shouldLoad: false,
      statesdata: [],
    };
  }

  componentDidMount() {
    data = this.props.data;
    this.modifyData();
  }

  modifyData() {
    let date;
    let state;
    let ageobj = { 0: 0 };
    let states = {};
    let genderobj = { M: 0, F: 0, U: 0 };
    let prefix;
    let gunobj = { stolen: 0, unknown: 0, legal: 0 };
    let deathobj = {};
    let agecat = { "0-9": 0, "10-18": 0, "19-25": 0, "25-64": 0, "64+": 0 };
    data.forEach((element) => {
      date = element.date.slice(-4);
      if (deathobj.hasOwnProperty(date)) {
        deathobj[date] = deathobj[date] + parseInt(element.n_killed);
      } else {
        deathobj[date] = parseInt(element.n_killed);
      }

      state = element.state;
      if (states.hasOwnProperty(state)) {
        states[state][date] = states[state][date] + parseInt(element.n_killed);
      } else {
        let ob = new Object();
        ob["2013"] = 0;
        ob["2014"] = 0;
        ob["2015"] = 0;
        ob["2016"] = 0;
        ob["2017"] = 0;
        ob["2018"] = 0;
        ob[date] = parseInt(element.n_killed);
        states[state] = ob;
      }

      var age = element.participant_age.split("||");
      age.forEach((a) => {
        prefix = a.substring(3, 5);
        let t = parseInt(prefix);
        if (t <= 9) {
          agecat["0-9"] = agecat["0-9"] + 1;
        } else if (t > 9 && t <= 18) {
          agecat["10-18"] = agecat["10-18"] + 1;
        } else if (t > 18 && t <= 25) {
          agecat["19-25"] = agecat["19-25"] + 1;
        } else if (t > 25 && t <= 64) {
          agecat["25-64"] = agecat["25-64"] + 1;
        } else if (t > 64) {
          agecat["64+"] = agecat["64+"] + 1;
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
        if (genderobj.hasOwnProperty(prefix)) {
          genderobj[prefix] = parseInt(genderobj[prefix]) + 1;
        } else {
          genderobj["U"] = parseInt(genderobj["U"]) + 1;
        }
      });

      var guns = element.gun_stolen.split("||");
      guns.forEach((gun) => {
        prefix = gun.substring(3);
        if (prefix.includes("Stolen")) {
          gunobj["stolen"] = parseInt(gunobj["stolen"]) + 1;
        } else if (prefix.includes("Not")) {
          gunobj["legal"] = parseInt(gunobj["legal"]) + 1;
        } else {
          gunobj["unknown"] = parseInt(gunobj["unknown"]) + 1;
        }
      });
    });
  }

  render() {
    return (
      <div id="maindiv">
        <ComparisionComponent
          state_names={state_names}
          states={states}
        ></ComparisionComponent>
        <GunDeathsComponent deathobj={deathobj}></GunDeathsComponent>
        <CrimeParticipantsComponent
          agecat={agecat}
        ></CrimeParticipantsComponent>
        <YearStatisticsComponent gunobj={gunobj}></YearStatisticsComponent>
      </div>
    );
  }
}

export default Visualization;
