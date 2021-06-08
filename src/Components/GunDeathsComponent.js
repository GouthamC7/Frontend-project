import React, { useEffect } from "react";

let GunDeathsComponent = (props) => {
  useEffect(() => {
    deathobj = props.deathobj;
    var keys = [];
    var values = [];
    for (element in deathobj) {
      keys.push(element);
      values.push(deathobj[element]);
    }

    var chart = document.getElementById("gunDeathChart").getContext("2d");
    var barChartOptions = {
      legend: { position: "bottom" },
    };
    var myChart = new Chart(chart, {
      type: "line",
      data: {
        labels: keys,
        datasets: [
          {
            label: "",
            data: values,
            backgroundColor: [
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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
    <div id="secondcontainer">
      <div className="headings">
        <h3 className="headingsinfo">National Gun Deaths by Year</h3>
      </div>
      <div id="death">
        <div id="deathleft">
          <canvas
            id="gunDeathChart"
            aria-label="donut chart"
            role="img"
          ></canvas>
        </div>
        <div id="deathright">
          <p id="sizefont">
            According to the U.S. Census Bureauthe national population has
            increased approximately 2.12 percent from 318.39 million in 2014 to
            325.15 million in 2017. However, the number of gun deaths has
            increased by over 20 percent during the same period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GunDeathsComponent;
