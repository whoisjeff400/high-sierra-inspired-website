import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, CheckCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Window from '../Window';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const ToDoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    const trimmedTask = task.trim();
    if (trimmedTask) {
      if (editingId) {
        setTasks(tasks.map(t => 
          t.id === editingId ? { ...t, text: trimmedTask } : t
        ));
        setEditingId(null);
      } else {
        const newTask: Task = {
          id: uuidv4(),
          text: trimmedTask,
          completed: false
        };
        setTasks([...tasks, newTask]);
      }
      setTask('');
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingId(task.id);
    setTask(task.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <Window title="To-Do List">
      <div className="p-2">
        <div className="flex mb-2">
          <input
            type="text"
            className="border p-2 flex-grow mr-2"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={editingId ? "Edit task..." : "Enter a new task..."}
          />
          <button 
            onClick={handleAddTask} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`flex justify-between items-center border-b py-2 ${task.completed ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <button 
                  onClick={() => handleToggleComplete(task.id)}
                  className="mr-2"
                >
                  <CheckCircle 
                    color={task.completed ? 'green' : 'gray'} 
                    size={20} 
                  />
                </button>
                <span className={task.completed ? 'line-through' : ''}>
                  {task.text}
                </span>
              </div>
              <div>
                <button 
                  onClick={() => handleEditTask(task)}
                  className="mr-2 text-blue-500"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
};

export default ToDoList;