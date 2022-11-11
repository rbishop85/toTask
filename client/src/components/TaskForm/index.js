import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_TASK } from "../../utils/mutations";

// import { QUERY_TASKS, QUERY_ME } from "../../utils/queries";
// import Auth from '../../utils/auth';
// import { Button } from 'react-bootstrap';

function TaskForm(props) {
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    value: '',
  });
  const [addTask, { error, data }] = useMutation(ADD_TASK);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addTask({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }
  };

  return !props.edit ? (
    <div>
      <form className="task-form" onSubmit={handleFormSubmit}>
        <label>
          Task category:
          <input
            name="name"
            type="text"
            placeholder="Insert Task Category"
            value={formState.name}
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
            value={formState.description}
            className="task-input"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Value:
          <input
            name="value"
            type="number"
            placeholder="price"
            value={formState.value}
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
      <form className="task-form" onSubmit={handleFormSubmit}>
         <input
            name="category"
            type="text"
            placeholder={props.edit.name}
            value={formState.name}
            className="task-input"
            onChange={handleChange}
          ></input>
        <input
          type="text"
          placeholder={props.edit.value}
          value={formState.description}
          name="text"
          className="task-input"
          onChange={handleChange}
        ></input>
    
        <button className="task-button" type='submit'>Update</button>
      </form>
    </div>
  );
};

export default TaskForm;
