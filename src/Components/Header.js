import React, { Component } from 'react';
import '../Styles/Header.css';
import Visualization from './Visualization';
import Ranking from './Ranking';
import Report from './Report';
let data =[]
class Header extends Component {

    constructor (props) {
        super(props);
        this.state = {
            load:1,
            isLoaded: false,
            rawdata: [],   
            shouldLoad: false
          };
    }
    componentDidMount() {
        // const data = [...jsonData];
        // console.log(data[0]);
        // console.log("Hello");
        // this.setState({
        //               shouldLoad: true,
        //               isLoaded: true,
        //               rawdata: data,http://localhost:8081/data
        //             });https://goutham-server.herokuapp.com/data
      fetch("https://goutham-server.herokuapp.com/data")
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result[0]);
            this.setState({
              isLoaded: true,
              rawdata: result,
              shouldLoad: false
            });
            //data = result;
          },
          (error) => {
          }
        )
        .finally(() => {
            this.setState({
              shouldLoad: true,
              isLoaded: true,
            });
        })
    }

    loadComponent(e,input) {
        e.preventDefault();
        console.log("success")
        console.log(input)
        if(input === 1) {
            this.setState({
                load:1
            }  
            )
        } else if(input === 2){
            this.setState({
                load:2
            }  
            )
        } else if(input === 3){
            this.setState({
                load:3
            }  
            )
        } else {
            
        }
    }

  render() {
        if(this.state.isLoaded) {
            return (
        <div>
        <nav>
        <ul id="head">
			<li class="items" onClick = {(e) => this.loadComponent(e,1)}>Visualizations</li>
			<li class="items" onClick = {(e) => this.loadComponent(e,2)}>Rankings</li>
			<li class="items" onClick = {(e) => this.loadComponent(e,3)}>Report</li>
		</ul>
        </nav>
        <div id="childcomponents">
            {this.state.load === 1 ?
            <Visualization data={this.state.rawdata}></Visualization> : this.state.load === 2 ? <Ranking data={this.state.rawdata}></Ranking>:<Report></Report>
            }
        </div>
        </div>
            )
        }
        else {
            return (
                <nav>
                    <ul id="head">
			            <li class="items" onClick = {(e) => this.loadComponent(e,1)}>Visualizations</li>
			            <li class="items" onClick = {(e) => this.loadComponent(e,2)}>Rankings</li>
			            <li class="items" onClick = {(e) => this.loadComponent(e,3)}>Report</li>
		            </ul>
                </nav>
            )
        }
  }
}

export default Header