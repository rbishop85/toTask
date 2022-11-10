import React from 'react';

const TaskAccordion = ({ tasks }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  return (
    <div>
     
      <div className="flex-row justify-space-between my-4">
        {tasks &&
          tasks.map((task) => (
            <div key={task._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {task.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                  {task.description}
                  {task.value}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskAccordion;