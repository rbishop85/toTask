import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';



function TaskPage() {
    return (
        <div className='task-form'>
            <TaskForm />
            <TaskList />
        </div>
      );
};

export default TaskPage;