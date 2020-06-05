import React, { Component } from 'react';
import '../Styles/Ranking.css'
let sorted=[];
let Chart = window.Chart;
class Ranking extends Component {

    constructor(props) {
        super(props)
        
    }

    draw() {
        let incidents = {};
        let temp;
        for(let i=0;i<10;i++) {
            temp = sorted[i].city_or_county+", "+sorted[i].state+", "+sorted[i].date;
            incidents[temp] = sorted[i].n_killed;
        }  
        var chart1 = document.getElementById("incidents").getContext('2d');
        var key1 = [];
        var value1 = [];
    
        for(var element in incidents) {
            key1.push(element);
            value1.push(incidents[element]);
        }
        var barChartOptions = {
            legend: {position: 'bottom'}
        }
        var myChart1 = new Chart(chart1, {
            type: 'horizontalBar',
            data: {
                labels: key1,
                datasets: [{
                label: '',
                data: value1,
                backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                ],
                borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
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
    var relobj = {};
    sorted.forEach(element => {
        var relation = element.participant_relationship.split("|");
        relation.forEach(rel => {
            temp = rel.substring(3);
            if(relobj.hasOwnProperty(temp)) {
                relobj[temp] = parseInt(relobj[temp]) + 1;
            } else {
                relobj[temp] = parseInt("1");
            }
    
        })
  })
  


        var sortable = [];
        for (var rel in relobj) {
            sortable.push([rel, relobj[rel]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        var relationdata = sortable.shift();

        var chart2 = document.getElementById("incidents2").getContext('2d');
        var key2 = [];
        var value2 = [];

        for(var j=0; j<10;j++) {
            key2.push(sortable[j][0])
            value2.push(sortable[j][1])
        }
    

        var barChartOptions = {
            legend: {position: 'bottom'}
        }
    var myChart2 = new Chart(chart2, {
        type: 'horizontalBar',
        data: {
            labels: key2,
            datasets: [{
                label: '',
                data: value2,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
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

    }

    componentDidMount() {
        console.log("data sent from one object to other")
        //console.log(this.props.data)
        sorted = this.props.data
        sorted.sort(function(a,b){ 
            return b.n_killed - a.n_killed;
        });
        this.draw();
    }

  render() {
    return(
        <div>
            <div>
                <h1 className="rankheading">Deadliest Incidents</h1>
            </div>
            <div id="incident_container">
                <canvas id="incidents" aria-label="donut chart" role="img"></canvas>
            </div>
            <div>
                <h1 className="rankheading">Most At-Risk Relationships</h1>
            </div>
            <div id="incident_container">
                <canvas id="incidents2" aria-label="donut chart" role="img"></canvas>
            </div>
        </div>
      
    ) 
  }
}

export default Ranking