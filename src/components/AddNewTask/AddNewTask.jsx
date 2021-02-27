import React, { Component } from "react";
import ToDo from "../ToDo/ToDo";
import NewTask from "../NewTask/NewTask";
import { Container, Row, Col } from "react-bootstrap";
import idGenerator from "../../utils/idGenerator"
import s from "./AddNewTask.module.css"

class AddNewTask extends Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: "task 1",
      },
      {
        _id: idGenerator(),
        title: "task 2",
      },
      {
        _id: idGenerator(),
        title: "task 3",
      },
    ],
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push({
        _id: idGenerator(),
        title: value
    });
    this.setState({
        tasks
    });
  }

  handleDelete = (_id) => {
    let tasks = [...this.state.tasks]
    tasks = tasks.filter(task => task._id !== _id)
    this.setState({
      tasks
    })
  }

  render() {
    const tasks = this.state.tasks.map(task => {
      return (
          <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
              <NewTask
                  task={task}
                  handleDelete={this.handleDelete}
              />
          </Col>
      );
  });
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{color: "white"}}>ToDo Component</h1>
            <ToDo handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center">
          {tasks.length? tasks : <p className={s.emptyText}>Tasks is empty</p>}
        </Row>
      </Container>
    );
  }
}

export default AddNewTask;
