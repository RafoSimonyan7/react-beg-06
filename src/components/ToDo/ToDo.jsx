import React, { Component } from "react";
import s from "./ToDo.module.css";
import { InputGroup, Form, Button } from "react-bootstrap";

class ToDo extends Component {
  state = {
    inputValue: "",
  };
  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
    });
  };

  handleSub = () => {
    this.props.handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  handleEnter = ({ type, key }) => {
    if (!this.state.inputValue || (type === "keypress" && key !== "Enter"))
      return;
    this.props.handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <div className={s.form_group}>
        <InputGroup className="mb-5 mt-5">
          <Form.Control
            type="text"
            placeholder="Add New Task"
            onChange={this.handleChange}
            onKeyPress={this.handleEnter}
            value={this.state.inputValue}
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={this.handleSub} className="ml-3">
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default ToDo;
