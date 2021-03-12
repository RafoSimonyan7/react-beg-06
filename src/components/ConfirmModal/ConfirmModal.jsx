import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteAllTasksModal extends Component {
    handleDelete =() => {
        this.props.deleteAllCheckedTasks();
        this.props.onHide();
    }
  render() {
      const {onHide} = this.props
    return (
        <Modal
        show={true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Add Task
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
         <p style={{fontSize: "22px"}}> Do you want to delete checked Task(s)?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          <Button
          variant='danger'
            onClick={this.handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteAllTasksModal;
