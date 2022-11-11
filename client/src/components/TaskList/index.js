import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS } from '../../utils/queries';
// import { Link } from 'react-router-dom';

function TaskList() {
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];


  return (
    <div>
      {tasks &&
        tasks.map(({ _id, name, description, value }) => (
          <div key={_id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {name} <br />
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {description} <br />
            </h4>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {value} <br />
            </h4>
          </div>
        ))}
    </div>
  );
};
// testing
export default TaskList;