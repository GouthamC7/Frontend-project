import React, { useEffect } from "react";
import "../Styles/Ranking.css";

const IncidentsRankingComponent = (props) => {
  let incidents = {};
  let label;
  //executes when component loads
  useEffect(() => {
    sortedData = this.props.sortedData;
    for (let i = 0; i < 10; i++) {
      label =
        sortedData[i].city_or_county +
        ", " +
        sortedData[i].state +
        ", " +
        sortedData[i].date;
      incidents[label] = sortedData[i].n_killed;
    }
    var chart = document.getElementById("chart").getContext("2d");
    var keys = [];
    var values = [];

    //keys and values for the chart
    for (var element in incidents) {
      keys.push(element);
      values.push(incidents[element]);
    }
    var barChartOptions = {
      legend: { position: "bottom" },
    };
    var myChart = new Chart(chart1, {
      type: "horizontalBar",
      data: {
        labels: keys,
        datasets: [
          {
            label: "",
            data: values,
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(54, 162, 235, 0.8)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(54, 162, 235, 1)",
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
  }, []);

  return (
    <div>
      <div>
        <h1 className="rankheading">Deadliest Incidents</h1>
      </div>
      <div id="incident_container">
        <canvas id="chart" aria-label="donut chart" role="img"></canvas>
      </div>
    </div>
  );
};

export default IncidentsRankingComponent;
