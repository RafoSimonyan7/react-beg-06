import React from "react";
import s from "./NewTask.module.css";
import { Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const NewTask = ({ task, handleDelete }) => {
  const deleteTask = (e) => {
    handleDelete(task._id);
  };
  return (
    <div className={s.main_tasks}>
      <Card className={s.cardBody}>
        <Card.Body>
            <Form.Check type="checkbox" className={s.checkbox} />
          <Card.Title>{task.title}</Card.Title>
          <Button onClick={deleteTask}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewTask;
