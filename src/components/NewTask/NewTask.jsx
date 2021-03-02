import React from "react";
import s from "./NewTask.module.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const NewTask = ({ task, handleDelete, toggleCheckedTask, isTasksChecked, checkedTask }) => {
  const deleteTask = (e) => {
    handleDelete(task._id);
  };

  const toggleCheck = (e) => {
    toggleCheckedTask(task._id);
  };

  const classes = [s.mainTasks]
  if (checkedTask) {
    classes.push(s.checked)
  }
  return (
    <div className={classes.join(" ")}>
      <div className={s.checkbox}>
        <input type="checkbox" onClick={toggleCheck} />
      </div>
      <div className={s.contentInfo}>
        <p>{task.title}</p>
      </div>
      <div className={s.buttons}>
        <Button
          variant="outline-primary"
          onClick={deleteTask}
          className="mr-3"
          disabled={isTasksChecked}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
        <Button variant="outline-warning" disabled={isTasksChecked}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
    </div>
  );
};

export default NewTask;
