import React, { Component } from 'react';
import '../Styles/Visualization.css';
let data = [];
let state_names = ["Alabama", "Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
  "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
  "West Virginia","Wisconsin","Wyoming" ]
const Chart = window.Chart;
const Highcharts = window.Highcharts;
class Visualization extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          data: [],
          state1: 'California',
          state2: 'Florida',
          shouldLoad: false,
          statesdata:[]
        };
        this.compare = this.compare.bind(this)
    }

    componentDidMount() {
        data = this.props.data;
        this.modifyData()
    }

    compare(e) {
        e.preventDefault();
        let input1 = document.getElementById("state1").value;
        let input2 = document.getElementById("state2").value;
        this.setState({
          state1: input1,
          state2: input2
        })
        this.draw(input1, input2, this.state.statesdata)
      }

    modifyData() {
let date;
let z;
let ageobj = {0:0};
let states = { };
let genderobj = {"M":0,"F":0,"U":0};
let temp;
let gunobj = {"stolen":0, "unknown":0, "legal":0};
let deathobj = {};
let agecat = {"0-9":0, "10-18":0, "19-25":0, "25-64":0, "64+":0}
data.forEach(element => {

    date = element.date.slice(-4);
    if(deathobj.hasOwnProperty(date)) {
      deathobj[date] = deathobj[date] + parseInt(element.n_killed);
  } else {
      deathobj[date] = parseInt(element.n_killed);
  }

    z = element.state;
    if(states.hasOwnProperty(element.state)) {
        states[element.state][date] = states[element.state][date] + parseInt(element.n_killed);
    } else {
        let ob = new Object;
        ob["2013"] = 0;
        ob["2014"] = 0;
        ob["2015"] = 0;
        ob["2016"] = 0;
        ob["2017"] = 0;
        ob["2018"] = 0;
        ob[date] = parseInt(element.n_killed);
        states[element.state] = ob;
    }


var d = element.date.split('-');
var age = element.participant_age.split("||");
age.forEach(a => {
    temp = a.substring(3,5)
    let t = parseInt(temp);
    if(t<=9) {
        agecat["0-9"] = agecat["0-9"]+1;
    } else if (t>9 && t<=18) {
        agecat["10-18"] = agecat["10-18"]+1;
    } else if(t>18 && t<=25) {
        agecat["19-25"] = agecat["19-25"]+1;
    } else if (t>25 && t<=64) {
        agecat["25-64"] = agecat["25-64"]+1;
    } else if(t>64){
        agecat["64+"] = agecat["64+"]+1;
    } else {

    }
    if(ageobj.hasOwnProperty(temp)) {
        ageobj[temp] = parseInt(ageobj[temp]) + 1;
    } else {
        ageobj[temp] = parseInt("1");
    }
})
var gender = element.participant_gender.split("||");
gender.forEach(gen => {
    temp = gen.substring(3,4);
    if(genderobj.hasOwnProperty(temp)) {
        genderobj[temp] = parseInt(genderobj[temp]) + 1;
    } else {
        genderobj["U"] = parseInt(genderobj["U"]) + 1;
    }

})

var guns = element.gun_stolen.split("||");
        guns.forEach(gun => {
            temp = gun.substring(3);
            if(temp.includes("Stolen")) {
                gunobj["stolen"] = parseInt(gunobj["stolen"]) + 1;
            } else if(temp.includes("Not")){
                gunobj["legal"] = parseInt(gunobj["legal"]) + 1;
            } else {
              gunobj["unknown"] = parseInt(gunobj["unknown"]) + 1;
            }
    
        })
})

this.setState({
  statesdata: states
})
this.draw("California", "Florida",states)

let first = {2013: 3, 2014: 284, 2015: 317, 2016: 398, 2017: 385, 2018: 72}
let second = {2013: 8, 2014: 181, 2015: 197, 2016: 183, 2017: 230, 2018: 54}


var key1 = [];
  var value1 = [];
  
  for(element in agecat) {
    key1.push(element);
    value1.push(agecat[element]);
  }
  console.log(key1)

var chart = document.getElementById("myChart4").getContext('2d');
  var barChartOptions = {
      legend: {position: 'bottom'}
  }
  var myChart = new Chart(chart, {
    type: 'bar',
    data: {
        labels: key1,
        datasets: [{
            label: '',
            data: value1,
            backgroundColor: [
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
           ],
           borderColor: [
            'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
          ],
            borderWidth: 1
        }]
    },
    options: {
      legend: {
        display: false,
        position: 'bottom'
  }
    }
  });

var gunkey= [];
var gunvalue = [];

for(var element in gunobj) {
  gunkey.push(element);
  gunvalue.push(gunobj[element]);
}
var chart = document.getElementById("guns").getContext('2d');
var barChartOptions = {
    legend: {position: 'bottom'}
}
var myChart = new Chart(chart, {
  type: 'doughnut',
  data: {
      labels: gunkey,
      datasets: [{
          label: '',
          data: gunvalue,
          backgroundColor: [
            'rgba(255, 206, 86, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
         ],
         borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)'
        ],
          borderWidth: 1
      }]
  },
  options: {
    legend: {
      display: true,
      position: 'bottom'
}
  }
});
var key = [];
var value = [];

var key3 = [];
    var value3 = [];
    
    for(element in deathobj) {
      key3.push(element);
      value3.push(deathobj[element]);
    }

    var chart = document.getElementById("myChart2").getContext('2d');
    var barChartOptions = {
        legend: {position: 'bottom'}
    }
    var myChart = new Chart(chart, {
      type: 'line',
      data: {
          labels: key3,
          datasets: [{
              label: '',
              data: value3,
              backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
             ],
             borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          display: false,
          position: 'bottom'
    }
      }
    });

for(var element in genderobj) {
  key.push(element);
  value.push(genderobj[element]);
}

var chart = document.getElementById("myChart").getContext('2d');
var barChartOptions = {
    legend: {position: 'bottom'}
}
var myChart = new Chart(chart, {
  type: 'doughnut',
  data: {
      labels: ['male', 'female','Unknown'],
      datasets: [{
          label: '',
          data: value,
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)',
         ],
         borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
          borderWidth: 1
      }]
  },
  options: {
    legend: {
      display: true,
      position: 'bottom'
}
  }
});

      }

      draw(state1, state2,states) {
          
        let yearsnum = [2013,2014,2015,2016,2017,2018];
    let temp1 =[];
    let temp2 =[];
    let statesinfo = states;
    console.log(statesinfo)
    yearsnum.forEach(y => {
        temp1.push(statesinfo[state1][y])
        temp2.push(statesinfo[state2][y])
      })
    
    Highcharts.chart('comparisioncontainer', {
    
      title: {
        text: 'Comparision'
      },
    
    
    
      yAxis: {
        title: {
          text: 'Number of Deaths'
        }
      },
    
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2013 to 2018'
        }
      },
    
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2013
        }
      },
    
      series: [{
        name: state1,
        data: temp1
      }, {
        name: state2,
        data: temp2
      }],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    
    });
      }

  render() {
    return(
        <div id="maindiv">
        <div id="firstcontainer">
            <div className="headings">
            <h3 className="headingsinfo">State Comparisions</h3>
            </div>
        
        <div id = "compare">
        
        <div id = "form">
          <form>

            <select name="stateselection" id="state1" className="stateselection" >
              <option value="Alabama" selected>Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District of Columbia">District of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
            <select name="stateselection" id="state2" className="stateselection">
            <option value="Alabama" >Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California" selected>California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District of Columbia">District of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
            <button class="btn btn-primary" id="comparebutton" onClick={this.compare}>Compare</button>
          </form>
        </div>
        <div >
        <figure className="highcharts-figure">
          <div id="comparisioncontainer"></div>
        </figure>
        </div>
      </div>
      </div>
      <div id = "secondcontainer">
        <div className="headings">
            <h3 className="headingsinfo">National Gun Deaths by Year</h3>
        </div>
      <div id = "death">
        <div id="deathleft">
          <canvas id="myChart2" aria-label="donut chart" role="img"></canvas>
        </div>
        <div id="deathright">
          
          <p id="sizefont">
            According to the U.S. Census Bureauthe national population has increased approximately 2.12 
            percent from 318.39 million in 2014 to 325.15 million in 2017. However, the number of gun deaths
            has increased by over 20 percent during the same period.
          </p>
        </div>
      </div>
      </div>
      <div id="thirdcontainer">
        <div className="headings">
            <h3 className="headingsinfo">Crime Participants by Age and Gender</h3>
        </div>
        <div>
        <p id="sizefont">
        Even though female population has been approximately 3 percent higher than the male population 
            for the last couple of years, the number of gun death caused by males is unproportionally higher,
            with men accounting  for roughly 85% of the total gun-related crimes in the United States. 
            According to the gun crime data males aged 26-64 are most likely to commit gun-related crimes.
          </p>
        </div>
        <div id = "death">
        <div id="deathleft">
        <canvas id="myChart4" aria-label="donut chart" role="img"></canvas>
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
      <div id = "death">
        <div id="deathleft">
        <p id="sizefont">
             Stolen guns are almost 10 times most likely to be involved in gun crimes than legally owned guns
            which usually require background check before purchase.
          </p>
        </div>
        <div id="deathright">
        <canvas id="guns" aria-label="donut chart" role="img"></canvas>
          
        </div>
      </div>
      </div>
      </div>  
    ) 
  }
}

export default Visualization