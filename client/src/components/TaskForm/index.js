import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_TASK } from "../../utils/mutations";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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

      window.location.reload();

    } catch (e) {
      console.error(e);
    }
  };

  return !props.edit ? (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-1" controlId='formTaskCategory'>
        <Form.Label>
          Task Category
        </Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter Task Category"
            value={formState.name}
            className="task-input"
            onChange={handleChange}
          ></Form.Control>
      </Form.Group>
      <Form.Group className="task-form" controlId='formTaskDescription'>
        <Form.Label>
            Task Description
          </Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Describe Your Task"
            value={formState.description}
            className="task-input"
            onChange={handleChange}
          ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-2" controlId='formTaskRate'>
        <Form.Label>
              Task Rate
            </Form.Label>
            <Form.Control
              name="value"
              type="number"
              placeholder="Enter Price"
              value={formState.value}
              className="task-input"
              onChange={handleChange}
            ></Form.Control>
      </Form.Group>
      

      <Button variant="primary" type='submit'>
          Add Task
        </Button>
    </Form>
  ) :
  (
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
