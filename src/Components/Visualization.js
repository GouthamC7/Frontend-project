import React, { Component } from "react";
import "../Styles/Visualization.css";
import ComparisionComponent from "./ComparisionComponent";
import GunDeathsComponent from "./GunDeathsComponent";

let data = [];
const Chart = window.Chart;
const Highcharts = window.Highcharts;

let state_names = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

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
    // this.compare = this.compare.bind(this);
  }

  componentDidMount() {
    data = this.props.data;
    this.modifyData();
  }

  // compare(e) {
  //   e.preventDefault();
  //   let input1 = document.getElementById("state1").value;
  //   let input2 = document.getElementById("state2").value;
  //   this.setState({
  //     input_state1: input1,
  //     input_state2: input2,
  //   });
  //   this.draw(input1, input2, this.state.statesdata);
  // }

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

    this.setState({
      statesdata: states,
    });
    this.draw("California", "Florida", states);

    var key1 = [];
    var value1 = [];

    for (element in agecat) {
      key1.push(element);
      value1.push(agecat[element]);
    }

    var chart = document.getElementById("myChart4").getContext("2d");
    var barChartOptions = {
      legend: { position: "bottom" },
    };
    var myChart = new Chart(chart, {
      type: "bar",
      data: {
        labels: key1,
        datasets: [
          {
            label: "",
            data: value1,
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
          position: "bottom",
        },
      },
    });

    var gunkey = [];
    var gunvalue = [];

    for (var element in gunobj) {
      gunkey.push(element);
      gunvalue.push(gunobj[element]);
    }
    var chart = document.getElementById("guns").getContext("2d");
    var barChartOptions = {
      legend: { position: "bottom" },
    };
    var myChart = new Chart(chart, {
      type: "doughnut",
      data: {
        labels: gunkey,
        datasets: [
          {
            label: "",
            data: gunvalue,
            backgroundColor: [
              "rgba(255, 206, 86, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
            borderColor: [
              "rgba(255, 206, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
    });
    var key = [];
    var value = [];

    for (var element in genderobj) {
      key.push(element);
      value.push(genderobj[element]);
    }

    var chart = document.getElementById("myChart").getContext("2d");
    var barChartOptions = {
      legend: { position: "bottom" },
    };
    var myChart = new Chart(chart, {
      type: "doughnut",
      data: {
        labels: ["male", "female", "Unknown"],
        datasets: [
          {
            label: "",
            data: value,
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(255, 99, 132, 0.8)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: true,
          position: "bottom",
        },
      },
    });
  }

  draw(input_state1, input_state2, states) {
    let yearsnum = [2013, 2014, 2015, 2016, 2017, 2018];
    let prefix1 = [];
    let prefix2 = [];
    let statesinfo = states;
    console.log(statesinfo);
    yearsnum.forEach((y) => {
      prefix1.push(statesinfo[input_state1][y]);
      prefix2.push(statesinfo[input_state2][y]);
    });

    Highcharts.chart("comparisioncontainer", {
      title: {
        text: "Comparision",
      },

      yAxis: {
        title: {
          text: "Number of Deaths",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2013 to 2018",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2013,
        },
      },

      series: [
        {
          name: input_state1,
          data: prefix1,
        },
        {
          name: input_state2,
          data: prefix2,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
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
        <div id="thirdcontainer">
          <div className="headings">
            <h3 className="headingsinfo">
              Crime Participants by Age and Gender
            </h3>
          </div>
          <div>
            <p id="sizefont">
              Even though female population has been approximately 3 percent
              higher than the male population for the last couple of years, the
              number of gun death caused by males is unproportionally higher,
              with men accounting for roughly 85% of the total gun-related
              crimes in the United States. According to the gun crime data males
              aged 26-64 are most likely to commit gun-related crimes.
            </p>
          </div>
          <div id="death">
            <div id="deathleft">
              <canvas
                id="myChart4"
                aria-label="donut chart"
                role="img"
              ></canvas>
            </div>
            <div id="deathright">
              <canvas id="myChart" aria-label="donut chart" role="img"></canvas>
            </div>
          </div>
        </div>

        <div id="fourthcontainer">
          <div className="headings">
            <h3 className="headingsinfo">National Gun Deaths by Year</h3>
          </div>
          <div id="death">
            <div id="deathleft">
              <p id="sizefont">
                Stolen guns are almost 10 times most likely to be involved in
                gun crimes than legally owned guns which usually require
                background check before purchase.
              </p>
            </div>
            <div id="deathright">
              <canvas id="guns" aria-label="donut chart" role="img"></canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Visualization;
