import React, { useState } from "react";
import { Button } from 'react-bootstrap';

function TaskForm(props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput("");
 
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(values => ({...values, [name]: value}));
  };

  return !props.edit ? (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          Task category:
          <input
            name="category"
            type="text"
            placeholder="Add task category"
            value={input.category || ""}
            className="task-input"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Description:
          <input
            name="description"
            type="text"
            placeholder="describe your task"
            value={input.description || ""}
            className="task-input"
            onChange={handleChange}
          ></input>
        </label>

        <button className="task-button" type='submit'>Add Task</button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Update entry: {props.edit.value}</h3>
      <form className="task-form" onSubmit={handleSubmit}>
         <input
            name="category"
            type="text"
            placeholder={props.edit.name}
            value={input.category || ""}
            className="task-input"
            onChange={handleChange}
          ></input>
        <input
          type="text"
          placeholder={props.edit.value}
          value={input.description}
          name="text"
          className="task-input"
          onChange={handleChange}
        ></input>
    
        <button className="task-button" type='submit'>Update</button>
      </form>
    </div>
  );
}

export default TaskForm;
