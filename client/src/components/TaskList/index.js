import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS } from '../../utils/queries';
// import { Link } from 'react-router-dom';
import TaskAccordion from '../TaskAccordion';

function TaskList() {
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];


  return (
    <div>
        <TaskAccordion 
          tasks={tasks}
        />
    </div>
  );
};
// testing
export default TaskList;