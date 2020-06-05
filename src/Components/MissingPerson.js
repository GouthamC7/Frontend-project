import React, { Component } from 'react'
import '../Styles/MissingPerson.css'
class MissingPerson extends Component {

  render() {
    return(
        <div class="body">
        <div id="container">
            <div id = "heading">
                <h1>Report a Missing Person</h1>
            </div>
            <form>
                <div >
                <div>
                    <label for = "name" class="lbl">Missing Person Full Name</label>
                </div>
                <div>
                    <input type="text" id = "name" class="ip"  placeholder="Enter your name" required/>
                </div>
                </div>
                <div >
                    <div >
                        <label for = "age" class="lbl">Missing Person Age</label>
                    </div>
                    <div >
                        <input type="number" id = "missingage" class="ip" placeholder="Enter age" required/>
                    </div>
                </div>
                <div >
                    <div >
                        <label for = "state" class="lbl">State</label>
                    </div>
                    <div >
                        <select name="state" id="state">
                            <option>California</option>
                            <option selected>Texas</option>
                            <option>Oregon</option>
                            </select>
                    </div>
                </div>
                <div >
                    <div >
                        <label for = "gender" class="lbl">Gender</label>
                    </div>
                    <div >
                        <select name="gender" id="gender">
                            <option selected>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            </select>
                    </div>
                </div>
                <div >
                    <div >
                        <label for = "mobile" class="lbl">Informer Mobile Number</label>
                    </div>
                    <div >
                        <input type="tel" id = "mobile" class="ip" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                    </div>
                </div>
                
                <div >
                    <div >
                        <label for = "text" class="lbl">Missing Person Details</label>
                    </div>
                    <div >
                        <textarea rows="5">

                        </textarea>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Submit" class="btn" id="submit"/>
                    <input type="reset" value="Reset" class="btn"/>
                </div>
            </form>
        </div>
      </div>
    ) 
  }
}

export default MissingPerson