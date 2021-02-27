import React from "react";
import s from "./NewTask.module.css"


const NewTask = ({ tasks }) => {
  return (
    <div className={s.main_tasks}>
      {tasks.map((task) => (
            <p className={s.tasks}>{task}</p>
      ))}
    </div>
  );
};

export default NewTask;
