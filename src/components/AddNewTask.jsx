import React, { Component } from "react";
import ToDo from "./ToDo";

class AddNewTask extends Component {
  state = {
    inputValue: "",
  };


  handleSubmit = (value) => {
    if(!value) {
    console.log("empty value");
    } else {
      console.log(`value = ${value}`);
    }
  }


  render() {
    return (
      <div className="main">
        <ToDo handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default AddNewTask;
