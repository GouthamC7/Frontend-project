import React, { useEffect } from "react";
import "../Styles/Ranking.css";

const RiskRankingComponent = (props) => {
  let relaationsData = {};

  // executes when component loads
  useEffect(() => {
    sortedData = this.props.sortedData;
    sortedData.forEach((element) => {
      var relation = element.participant_relationship.split("|");
      relation.forEach((rel) => {
        temp = rel.substring(3);
        if (relaationsData.hasOwnProperty(temp)) {
          relaationsData[temp] = parseInt(relaationsData[temp]) + 1;
        } else {
          relaationsData[temp] = parseInt("1");
        }
      });
    });

    let sortable = [];
    for (var rel in relaationsData) {
      sortable.push([rel, relaationsData[rel]]);
    }

    // sort the array based on kills
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    var chart = document.getElementById("chart").getContext("2d");
    var keys = [];
    var values = [];

    //keys and values for chart
    for (var j = 0; j < 10; j++) {
      keys.push(sortable[j][0]);
      values.push(sortable[j][1]);
    }

    var barChartOptions = {
      legend: { position: "bottom" },
    };
    var myChart2 = new Chart(chart, {
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
        <h1 className="rankheading">Most At-Risk Relationships</h1>
      </div>
      <div id="incident_container">
        <canvas id="chart" aria-label="donut chart" role="img"></canvas>
      </div>
    </div>
  );
};

export default RiskRankingComponent;
