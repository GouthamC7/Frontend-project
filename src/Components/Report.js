import React, { Component } from 'react';
import '../Styles/Report.css'
import Crime from './Crime';
import MissingPerson from './MissingPerson';

class Report extends Component {

    constructor (props) {
        super(props);
        this.state = {
            load:1
        } 
    }

    load(e,input) {
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
        } else {

        }
    }

  render() {
    return (
        <div>
        <nav id="secondheader">
        <ul >
			<li className="reportitems"><button onClick = {(e) => this.load(e,1)}>Register a Crime</button></li>
			<li className="reportitems"><button onClick = {(e) => this.load(e,2)}>Report Missing Person</button></li>
		</ul>
        </nav>
        <div>
            {this.state.load === 1 ?
            <Crime></Crime> : <MissingPerson></MissingPerson>
        }
        </div>
        </div>
         
    )
  }
}

export default Report