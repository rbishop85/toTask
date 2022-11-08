import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_TASK } from "../../utils/mutations";
import { QUERY_TASKS, QUERY_ME } from "../../utils/queries";
import Auth from '../../utils/auth';
// import { Button } from 'react-bootstrap';

function TaskForm(props) {
    const [taskInput, setTaskInput] = useState('');
  
    const [addTask, { error }] = useMutation(ADD_TASK, {
      update(cache, { data: { addTask } }) {
        try {
          const { tasks } = cache.readQuery({ query: QUERY_TASKS });
  
          cache.writeQuery({
            query: QUERY_TASKS,
            data: { tasks: [addTask, ...tasks] },
          });
        } catch (e) {
          console.error(e);
        }
  
        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, tasks: [...me.tasks, addTask] } },
        });
      },
    });
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addTask({
          variables: {
            name: taskInput.name,
            description: taskInput.description,
            // fix this
            toerId: Auth.getProfile().data.useId,
          },
        });
  
        setTaskInput('');
      } catch (err) {
        console.error(err);
      }
    };


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskInput(values => ({...values, [name]: value}));
  };

  return !props.edit ? (
    <div>
      <form className="task-form" onSubmit={handleFormSubmit}>
        <label>
          Task category:
          <input
            name="taskCategory"
            type="text"
            placeholder="Insert Task Category"
            value={taskInput.name}
            className="task-input"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Description:
          <input
            name="taskDescription"
            type="text"
            placeholder="describe your task"
            value={taskInput.description}
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
            value={taskInput.name}
            className="task-input"
            onChange={handleChange}
          ></input>
        <input
          type="text"
          placeholder={props.edit.value}
          value={taskInput.description}
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
