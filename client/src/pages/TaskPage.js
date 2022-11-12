import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';



function TaskPage() {
    return (
        <main>
        <div className='task-form mb-3 pl-5 pr-5 pb-5 border rounded border-3'>
            <TaskForm />
            
        </div>
        <div><TaskList /></div>
        </main>
      );
};

export default TaskPage;