import React, { Component } from "react";
import NewTask from "../NewTask/NewTask";
import { Container, Row, Col, Button } from "react-bootstrap";
import idGenerator from "../../utils/idGenerator";
import s from "./ToDo.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import AddOrEditTaskModal from "../AddOrEditTaskModal/AddOrEditTaskModal";

class ToDo extends Component {
  state = {
    tasks: [
      {
        _id: idGenerator(),
        title: "task 1",
        description: "task 1",
      },
      {
        _id: idGenerator(),
        title: "task 2",
        description: "task 2",
      },
      {
        _id: idGenerator(),
        title: "task 3",
        description: "task 3",
      },
    ],
    checkedTasks: new Set(),
    isAllTasksChecked: false,
    isTasksDeleteModalOpen: false,
    editTasks: null,
  };

  handleSubmit = (formData) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      ...formData,
      _id: idGenerator(),
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

  handleCheckedAllTasks = () => {
    const { tasks, isAllTasksChecked } = this.state;
    let checkedTasks = new Set();
    if (!isAllTasksChecked) {
      checkedTasks = new Set(this.state.checkedTasks);
      tasks.forEach((task) => {
        checkedTasks.add(task._id);
      });
    }
    this.setState({
      checkedTasks,
      isAllTasksChecked: !isAllTasksChecked,
    });
  };

  
  toggleOpenDeleteTasksModal = () => {
    this.setState({
      isTasksDeleteModalOpen: !this.state.isTasksDeleteModalOpen,
    });
  };

  isOpenAddOrEditTasksModal = (editTasks) => {
    this.setState({
      editTasks
    });
  };

  closeEditTaskModal = () => {
    this.setState({
      editTasks: null,
    });
  };

  handleEditTask = (editTasks) => {
    const tasks = [...this.state.tasks];
    const taskIdx = tasks.findIndex(task => task._id === editTasks._id);
    tasks[taskIdx] = editTasks;
    this.setState({
      tasks,
    });
  };

  render() {
    const {
      tasks,
      checkedTasks,
      isTasksDeleteModalOpen,
      editTasks,
    } = this.state;
    const task = this.state.tasks.map((task) => {
      return (
        <Col key={task._id} className="mt-3" xs={12} sm={6} md={4} lg={3}>
          <NewTask
            key={task._id}
            task={task}
            handleDelete={this.handleDelete}
            toggleCheckedTask={this.toggleCheckedTask}
            isTasksChecked={!!this.state.checkedTasks.size}
            checkedTask={this.state.checkedTasks.has(task._id)}
            checked={this.state.checkedTasks.has(task._id)}
            isOpenAddOrEditTasksModal={this.isOpenAddOrEditTasksModal}
          />
        </Col>
      );
    });

    return (
      <div>
        <Container>
          <Row className="mt-3">
            <Col>
              <h1 style={{ color: "white" }}>TODO</h1>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button onClick={this.isOpenAddOrEditTasksModal}>Add Task</Button>
            </Col>
          </Row>
          <Row className="mt-5 d-flex justify-content-center">
            {task.length ? (
              task
            ) : (
              <p className={s.emptyText}>Tasks is empty</p>
            )}
          </Row>
          <Row className="justify-content-end mt-3">
            <Button variant="primary" onClick={this.handleCheckedAllTasks}>
              {tasks.length === checkedTasks.size
                ? "Remove Selected"
                : "Check All"}
            </Button>
          </Row>
          {!!this.state.checkedTasks.size ? (
            <Row className="mt-5 justify-content-center">
              <Button
                variant="danger"
                className="p-2"
                onClick={this.toggleOpenDeleteTasksModal}
              >
                Delete Checked Task(s)
              </Button>
            </Row>
          ) : (
            <div></div>
          )}
        </Container>
        {isTasksDeleteModalOpen && (
          <ConfirmModal
            onHide={this.toggleOpenDeleteTasksModal}
            deleteAllCheckedTasks={this.deleteAllCheckedTasks}
          />
        )}
        {editTasks && (
          <AddOrEditTaskModal
            editTasks={editTasks}
            onHide={this.closeEditTaskModal}
            isModalTaskOpen={editTasks._id}
            handleAddNewTask={this.handleSubmit}
            handleEditTask={this.handleEditTask}
          />
        )}
      </div>
    );
  }
}

export default ToDo;
