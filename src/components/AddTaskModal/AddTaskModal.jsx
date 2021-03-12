import React, { Component, createRef } from "react";
import s from "./AddTaskModal.module.css";
import { Form, Button, Modal } from "react-bootstrap";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      title: "",
      description: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSub = ({ type, key }) => {
    const { title, description } = this.state;
    if (!title || !description || (type === "keypress" && key !== "Enter")) {
      return;
    }
    const tasksData = {
      title,
      description,
    };
    this.props.handleSubmit(tasksData);
    this.props.onHide();
  };
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { isTasksChecked, onHide } = this.props;
    return (
      <div className={s.form_group}>
        <Modal
          show={true}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mb-5 mt-5" onSubmit={(e) => e.preventDefault()}>
              <Form.Group>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={this.handleChange}
                  onKeyPress={this.handleSub}
                  disabled={isTasksChecked}
                  ref={this.inputRef}
                  value={this.state.title}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows={3}
                  style={{ resize: "none" }}
                  placeholder="Description"
                  onChange={this.handleChange}
                  value={this.state.description}
                  disabled={isTasksChecked}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide} variant="secondary">
              Close
            </Button>
            <Button
              onClick={this.handleSub}
              disabled={
                isTasksChecked || !this.state.title || !this.state.description
              }
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTask;
