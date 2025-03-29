import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';


const Tasks = () => {
  const { user } = useAuth();
  const { event } = useEvent();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);


  // Function to fetch tasks based on the event context
  const fetchTasks = async () => {
    if (!event) return; // Only fetch if the event exists
    try {
      console.log("Fetching tasks for event:", event);
      const response = await axiosInstance.get(`/api/auth/tasks?eventName=${event.Ename}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log("Fetched Tasks:", response.data);  // Debugging
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.response ? error.response.data : error.message);
    }
  };

  // useEffect to fetch tasks when the component mounts or when the event context changes
  useEffect(() => {
    if (event) {
      //fetchTasks(); // Fetch tasks whenever the event changes
    }
  }, [event, user]); // Dependency array includes `event` and `user`

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <TaskList tasks={tasks} setTasks={setTasks} setEditingTask={setEditingTask} />
    </div>
  );
};

export default Tasks;
