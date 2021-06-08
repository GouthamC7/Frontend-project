import React from "react";

let draw = (input_state1, input_state2, states) => {};

//executes when user clicks compare button
ComparisionComponent = (props) => {
  let compare = (e) => {
    //prevents page from refreshing
    e.preventDefault();
    let input1 = document.getElementById("state1").value;
    let input2 = document.getElementById("state2").value;
    let yearsnum = [2013, 2014, 2015, 2016, 2017, 2018];
    let prefix1 = [];
    let prefix2 = [];
    let statesinfo = props.states;
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
  };

  return (
    <div id="firstcontainer">
      <div className="headings">
        <h3 className="headingsinfo">State Comparisions</h3>
      </div>
      <div id="compare">
        <div id="form">
          <form>
            <select id="state1" className="stateselection">
              {this.props.state.map((state) => {
                <option value={state}>{state}</option>;
              })}
            </select>
            <select id="state2" className="stateselection">
              {this.props.state.map((state) => {
                <option value={state}>{state}</option>;
              })}
            </select>
            <button
              class="btn btn-primary"
              id="comparebutton"
              onClick={this.compare}
            >
              Click
            </button>
          </form>
        </div>
        <div>
          <figure className="highcharts-figure">
            <div id="comparisioncontainer"></div>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default ComparisionComponent;
