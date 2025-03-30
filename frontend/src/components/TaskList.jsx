import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();
  const { setCurrentEvent } = useEvent();
  const { event } = useEvent();
  const [formData, setFormData] = useState({ Ename: '', Vname: '', Edate: '' });
  const navigate = useNavigate();

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/auth/tasks/${event.Ename}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axiosInstance.get(`/api/auth/tasks?eventName=${encodeURIComponent(event.Ename)}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setCurrentEvent(response.data);

      setFormData({
        Ename: response.data.Ename || '',
        Vname: response.data.Vname || '',
        Edate: response.data.Edate || '',
      });

      setEditingTask(response.data);

      navigate('/tasks'); 

      alert("Editing Task: " + JSON.stringify(response.data));
    } catch (error) {
      alert('Failed to get task.');
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </p>
          <div className="mt-2">
            <button
              onClick={handleEdit} // Calling handleEdit without taskId
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)} // Keep deleting based on taskId
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
