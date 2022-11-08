import React, { useState } from 'react';
import TaskForm from '../TaskForm';
import Tasks from '../Tasks';

const TaskList = (props) => {
    const [tasks, setTask] = useState([]);

    const addTaskItem = (item) => {
      console.log(
        item
      );

      if (!item.text) {
        return;
      }
 
      const newTask = [item, ...tasks];
      console.log(newTask);

      setTask(newTask);
    };
  
    const completeTaskItem = (id) => {
      let updatedTask = tasks.map((item) => {
        if (item.id === id) {
          item.isComplete = !item.isComplete;
        }
        return item;
      });
  
      console.log(updatedTask);
      setTask(updatedTask);
    };
  
    const removeTaskItem = (id) => {
      const updatedTask = [...tasks].filter((item) => item.id !== id);
  
      setTask(updatedTask);
    };

    const editTaskItem = (itemId, newValue) => {
      if (!newValue.text) {
        return;
      }
  
      setTask((prev) =>
        prev.map((item) => (item.id === itemId ? newValue : item))
      );
    };
  
    return (
      <div>
        <h1>Add a task here.</h1>
        <TaskForm onSubmit={addTaskItem} />
        <Tasks
          tasks={tasks}
          completeTaskItem={completeTaskItem}
          removeTaskItem={removeTaskItem}
          editTaskItem={editTaskItem}
        ></Tasks>
      </div>
    );
}

export default TaskList;
