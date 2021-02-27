import React, { Component } from "react";
import ToDo from "../ToDo/ToDo";
import NewTask from "../NewTask/NewTask";
import { Container, Row, Col } from "react-bootstrap";

class AddNewTask extends Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  handleSubmit = (task) => {
    const tasks = [...this.state.tasks, task];
    if (!task) {
      console.log("empty value");
    } else {
      this.state.tasks.push({ task });
      this.setState({
        tasks,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>ToDo Component</h1>
            <ToDo handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center">
          <NewTask tasks={this.state.tasks} />
        </Row>
      </Container>
    );
  }
}

export default AddNewTask;
