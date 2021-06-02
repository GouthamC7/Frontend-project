import React from "react";

const YearStatisticsComponent = (props) => {
  var gunkey = [];
  var gunvalue = [];

  for (var element in props.gunobj) {
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
  return (
    <div id="fourthcontainer">
      <div className="headings">
        <h3 className="headingsinfo">National Gun Deaths by Year</h3>
      </div>
      <div id="death">
        <div id="deathleft">
          <p id="sizefont">
            Stolen guns are almost 10 times most likely to be involved in gun
            crimes than legally owned guns which usually require background
            check before purchase.
          </p>
        </div>
        <div id="deathright">
          <canvas id="guns" aria-label="donut chart" role="img"></canvas>
        </div>
      </div>
    </div>
  );
};

export default YearStatisticsComponent;
