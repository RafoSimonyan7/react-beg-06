import React, { Component, createRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.state = {
      ...props.editTasks,
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

  handleSubmit = () => {
    const { isModalTaskOpen } = this.props;
    if (isModalTaskOpen === undefined) {
      const { title, description } = this.state;
      const tasksData = {
        title,
        description,
      };
      this.props.handleAddNewTask(tasksData);
    } else {
      this.props.handleEditTask(this.state);
    }
    this.props.onHide();
  };
  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { onHide, isModalTaskOpen } = this.props;
    const {title, description} = this.state
    return (
      <div>
        <Modal
          show={true}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {isModalTaskOpen === undefined ? "Add Task" : "Edit Task"}
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
                  value={title}
                  ref={this.inputRef}
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
                  value={description}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide} variant="secondary">
              Close
            </Button>
            <Button
              onClick={this.handleSubmit}
              disabled={!this.state.title || !this.state.description}
            >
              {isModalTaskOpen === undefined ? "Add" : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditTaskModal;
