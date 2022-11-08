import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_TASK } from "../../utils/queries";

const SingleTask = () => {
    const { taskId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_TASK, {

      variables: { taskId: taskId },
    });
  
    const task = data?.task || {};
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div >
        <h3 >
          {task.name}
          {task.description}
          {task.value}
          {task.postDate}
          {task.dueDate}
          {task.completeDate}
          {task.tag}
          {task.toerId}
          {task.doerId}
        </h3>
      </div>
    );
  };
export default SingleTask;