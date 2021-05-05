import React from "react";
import s from "./NewTask.module.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import PropTypes from "prop-types";

const NewTask = ({
  task,
  handleDelete,
  toggleCheckedTask,
  isTasksChecked,
  checkedTask,
  checked,
  isOpenAddOrEditTasksModal,
}) => {
  const deleteTask = (e) => {
    handleDelete(task._id);
  };

  const toggleCheck = (e) => {
    toggleCheckedTask(task._id);
  };

  const handleEdit = (e) => {
    isOpenAddOrEditTasksModal(task);
  };

  const classes = [s.mainTasks];
  if (checkedTask) {
    classes.push(s.checked);
  }

  return (
    <div className={classes.join(" ")}>
      <div className={s.checkbox}>
        <input type="checkbox" onChange={toggleCheck} checked={checked} />
      </div>
      <div className={s.contentInfo}>
        <h3>{task.title}</h3>
        <h6>{task.description}</h6>
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
        <Button
          variant="outline-warning"
          disabled={isTasksChecked}
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </div>
    </div>
  );
};

NewTask.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  handleDelete: PropTypes.func.isRequired,
  toggleCheckedTask: PropTypes.func.isRequired,
  isTasksChecked: PropTypes.bool.isRequired,
  checkedTask: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(NewTask);
