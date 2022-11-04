import React, { useState } from "react";

function TaskForm(props) {
  const [input, setInput] = useState("");
  let [eagerness, setEagerness] = useState("");

  const eagernessLevel = ["high", "medium", "low"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eagerness) {
      eagerness = "low";
    }

    props.onSubmit({
      id: Math.random(Math.floor() * 1000),
      text: input,
      eagerness: eagerness,
    });

    setInput("");
    setEagerness("");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return !props.edit ? (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label>
            Task category:
            <input
            name="task title"
            type="dropdown"
            placeholder="Add task category"
            className="task-input"
            onChange={handleChange}
            ></input>
        </label>
        <label>
            Description: 
        <input
          name="task description"
          type="text"
          placeholder="describe your task"
          value={input}
          className="task-input"
          onChange={handleChange}
        ></input>
        </label>

        <label>
          Due Date:
          <input
            name="task due-date"
            type="date"
            placeholder="describe your task"
            value={input}
            className="task-input"
            onChange={handleChange}
          ></input>
        </label>
        <div className="dropdown">
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || "Priority"}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setEagerness(eagernessLevel[0])}>Urgent </p>
            <p onClick={() => setEagerness(eagernessLevel[1])}>2-3 days</p>
            <p onClick={() => setEagerness(eagernessLevel[2])}>4-7 days</p>
          </div>
        </div>
        <button className="task-button">Add Task</button>
      </form>
    </div>
  ) : (
    <div>
      <h3>Update entry: {props.edit.value}</h3>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={props.edit.value}
          value={input}
          name="text"
          className="task-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          <button className={`dropbtn ${eagerness}`}>
            {eagerness || "Priority"}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setEagerness(eagernessLevel[0])}>Urgent</p>
            <p onClick={() => setEagerness(eagernessLevel[1])}>2-3 days</p>
            <p onClick={() => setEagerness(eagernessLevel[2])}>4-7 days</p>
          </div>
        </div>
        <button className="task-button">Update</button>
      </form>
    </div>
  );
}

export default TaskForm;
