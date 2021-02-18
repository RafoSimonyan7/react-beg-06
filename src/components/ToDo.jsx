import React, { Component } from "react";

class ToDo extends Component {
  state = {
    inputValue: ""
  };
  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSub = () => {
    const { handleSubmit } = this.props;
    handleSubmit(this.state.inputValue)
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Add New Task"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <button onClick={this.handleSub}>ADD</button>
      </div>
    );
  }
}

export default ToDo;
