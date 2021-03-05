import React, { Component } from "react";
import AddTask from "../AddTask/AddTask";
import NewTask from "../NewTask/NewTask";
import { Container, Row, Col, Button } from "react-bootstrap";
import idGenerator from "../../utils/idGenerator";
import s from "./ToDo.module.css";

class ToDo extends Component {
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
    checkedTasks: new Set(),
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      _id: idGenerator(),
      title: value,
    });
    this.setState({
      tasks,
    });
  };

  handleDelete = (_id) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => task._id !== _id);
    this.setState({
      tasks,
    });
  };

  toggleCheckedTask = (_id) => {
    const checkedTasks = this.state.checkedTasks;
    if (!checkedTasks.has(_id)) {
      checkedTasks.add(_id);
    } else {
      checkedTasks.delete(_id);
    }
    this.setState({
      checkedTasks,
    });
  };

  deleteAllCheckedTasks = () => {
    const { checkedTasks } = this.state;
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => !checkedTasks.has(task._id));
    this.setState({
      tasks,
      checkedTasks: new Set(),
    });
  };

  render() {
    const tasks = this.state.tasks.map((task) => {
      return (
  
        <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
          <NewTask
            key={task._id}
            task={task}
            handleDelete={this.handleDelete}
            toggleCheckedTask={this.toggleCheckedTask}
            isTasksChecked={!!this.state.checkedTasks.size}
            checkedTask={this.state.checkedTasks.has(task._id)}
          />
        </Col>
        
      );
    });

    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{ color: "white" }}>ToDo</h1>
            <AddTask
              handleSubmit={this.handleSubmit}
              isTasksChecked={!!this.state.checkedTasks.size}
            />
          </Col>
        </Row>
        <Row className="mt-5 d-flex justify-content-center">
          {tasks.length ? tasks : <p className={s.emptyText}>Tasks is empty</p>}
        </Row>
        {/* <Row className="justify-content-end">
          <Button
            variant="primary"
          >
            Select All
          </Button>
        </Row> */}
        {!!this.state.checkedTasks.size ? (
          <Row className="mt-5 justify-content-center">
            <Button
              variant="danger"
              className="p-2"
              onClick={this.deleteAllCheckedTasks}
            >
              Delete Checked Task(s)
            </Button>
          </Row>
        ) : (
          <div></div>
        )}
      </Container>
    );
  }
}

export default ToDo;
