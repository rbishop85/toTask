import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';



function TaskPage() {
    return (
        <main>
        <div className='task-form pl-5 pr-5 pb-5 border rounded border-3'>
            <TaskForm />
            
        </div>
        <div className='mb-4'><TaskList /></div>
        </main>
      );
};

export default TaskPage;