import React, { useState } from 'react';
import TaskForm from '../TaskForm';


function Tasks(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    eagerness: '',
  });

  console.log(props.tasks);

  const submitUpdate = (value) => {
    props.editTaskItem(edit.id, value);
    setEdit({ id: null, value: '', eagerness: '' });
  };

  if (edit.id) {
    return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.tasks.map((item, i) => (
    <div
      className={
        item.isComplete
          ? `task-row complete ${item.eagerness}`
          : `task-row ${item.eagerness}`
      }
      key={i}
    >
      <div key={item.id} onClick={() => props.completeTaskItem(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}> ✏️</p>
        <p onClick={() => props.removeTaskItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Tasks;

