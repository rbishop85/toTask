import React from 'react';
import TaskForm from '../TaskForm';
// import { Link } from 'react-router-dom';

const TaskList = ({ tasks, title }) => {
  // if (!tasks.length) {
  //   return <h3>No Tasks Yet</h3>;
  // }

  return (
    <div>
      <TaskForm onSubmit={tasks} />
      <h3>{title}</h3>
      {tasks &&
        tasks.map((task) => (
          <div key={task._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {task.name} <br />
              <span style={{ fontSize: '1rem' }}>
                this task was created on {task.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{task.description}</p>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/totasks/${thought}`}
            >
              Join the discussion on this thought.
            </Link> */}
          </div>
        ))}
    </div>
  );
};
// testing
export default TaskList;