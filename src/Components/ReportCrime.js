import React, { Component } from "react";
import "../Styles/ReportCrime.css";

class ReportCrime extends Component {
  render() {
    return (
      <div className="body">
        <div id="container">
          <div id="heading">
            <h1>Register a ReportCrime</h1>
          </div>
          <form id="report">
            <div>
              <div>
                <label for="name" class="lbl">
                  Name
                </label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  class="ip"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label for="email" class="lbl">
                  Email
                </label>
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  class="ip"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label for="mobile" class="lbl">
                  Mobile Number
                </label>
              </div>
              <div>
                <input
                  type="tel"
                  id="mobile"
                  class="ip"
                  placeholder="123-456-7890"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label for="state" class="lbl">
                  State
                </label>
              </div>
              <div>
                <select name="state" id="state">
                  <option>California</option>
                  <option selected>Oregon</option>
                  <option>Texas</option>
                </select>
              </div>
            </div>
            <div>
              <div>
                <label for="text" class="lbl">
                  ReportCrime
                </label>
              </div>
              <div>
                <textarea rows="5"></textarea>
              </div>
            </div>
            <div>
              <input type="submit" value="Submit" class="btn" id="submit" />
              <input type="reset" value="Reset" class="btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReportCrime;
