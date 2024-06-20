import { useState,useEffect } from 'react';
import './App.css';
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('Tasks'));
    if (items) {
      setTasks(items);
    }
  }, []);

  const handleAddNewTask = (e) => {
    e.preventDefault();

    if(newTask==="") return;
    
    const task = {
      id: tasks.length + 1,
      Name: newTask,
      Status: false
    };

    const updatedTask = [...tasks, task];
    setTasks(updatedTask)
    localStorage.setItem('Tasks', JSON.stringify(updatedTask));
    setNewTask("");
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleTick = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, Status: !task.Status } : task));
  };

  const handleDelete = (id) => {
    const updatedTask = tasks.filter(task => task.id !== id);
    setTasks(updatedTask);
    localStorage.setItem('Tasks', JSON.stringify(updatedTask));
  };

  //Just For 2nd Commit

  return (
    <div className='mainbody'>
      <div className='todo'>
        <h1>To-Do List</h1>
        <IoAddCircleOutline className='add-icon' size={35} onClick={handleAddNewTask} />
      </div>
      <form className='addtask' onSubmit={handleAddNewTask}>
        <input 
          type='text' 
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Enter a new task"
        />
      </form>
      <div className='content'>
        {tasks.map((task) => (
          <div className='task' key={task.id}>
            <input 
              type='checkbox'
              checked={task.Status} 
              onChange={() => handleTick(task.id)} 
            />
            <p>{task.Name}</p>
            {task.Status && <MdDelete className='delete-icon' size={25} onClick={() => handleDelete(task.id)} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;