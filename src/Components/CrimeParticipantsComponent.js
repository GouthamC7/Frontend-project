import React from "react";

const CrimeParticipantsComponent = (props) => {
  let keys = [];
  let values = [];
  //keys and values for the chart
  for (element in props.agecat) {
    keys.push(element);
    values.push(agecat[element]);
  }

  var chart = document.getElementById("chart").getContext("2d");
  var barChartOptions = {
    legend: { position: "bottom" },
  };
  //code for displaying chart
  var myChart = new Chart(chart, {
    type: "bar",
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
  return (
    <div id="thirdcontainer">
      <div className="headings">
        <h3 className="headingsinfo">Crime Participants by Age and Gender</h3>
      </div>
      <div>
        <p id="sizefont">
          Even though female population has been approximately 3 percent higher
          than the male population for the last couple of years, the number of
          gun death caused by males is unproportionally higher, with men
          accounting for roughly 85% of the total gun-related crimes in the
          United States. According to the gun crime data males aged 26-64 are
          most likely to commit gun-related crimes.
        </p>
      </div>
      <div id="death">
        <div id="deathleft">
          <canvas id="chart" aria-label="donut chart" role="img"></canvas>
        </div>
        <div id="deathright">
          <canvas id="myChart" aria-label="donut chart" role="img"></canvas>
        </div>
      </div>
    </div>
  );
};

export default CrimeParticipantsComponent;
