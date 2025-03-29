import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEvent } from '../context/EventContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const { event, setCurrentEvent } = useEvent(); // Assuming this is to set event info
  const [formData, setFormData] = useState({ Ename: '', Vname: '', Edate: '' });

  useEffect(() => {
    if (editingTask && Object.keys(editingTask).length > 0) {
      setFormData({
        Ename: editingTask.Ename || '',
        Vname: editingTask.Vname || '',
        Edate: editingTask.Edate || '',
      });
    } else {
      setFormData({ Ename: '', Vname: '', Edate: '' });
    }
  }, [editingTask]);

  // Handle field blur (when the user leaves the field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (Object.keys(tasks).length > 0 && formData.Ename !== event.Ename) {
      const updateField = (fieldName, newValue) => {
        setCurrentEvent((prevEvent) => ({
          ...prevEvent, // Spread the previous event state
          [fieldName]: newValue, // Update the specific field
        }));
      };
      updateField(name, value); // Update Ename or other fields dynamically
    }
  };

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically set the form field
    }));
  };

  // Handle form submission (for both creating and updating events)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (editingTask) {
        alert("this is editingtask:"+JSON.stringify(editingTask));
        response = await axiosInstance.put(`/api/auth/tasks/${editingTask.Ename}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Api call for edit complete");
        // Update the task list with the updated task
        setTasks(tasks.map((task) =>
          task._id === editingTask._id ? { ...task, ...response.data } : task
        ));
        alert("task checking");
        setEditingTask(null);
      } else {
        response = await axiosInstance.post('/api/auth/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        // After creating the new task, update the task list
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setCurrentEvent(response.data); // Update the current event context

        alert("Response: " + JSON.stringify(response.data));
      }
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingTask ? 'Event Updation' : 'Event Creation'}
      </h1>
      <input
        type="text"
        name="Ename"
        placeholder="Event name"
        value={formData.Ename}
        onBlur={handleBlur} // Trigger handleBlur when the input loses focus
        onChange={handleChange} // Trigger handleChange while typing
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        name="Vname"
        placeholder="Volunteer Name"
        value={formData.Vname}
        onChange={handleChange} // Trigger handleChange for Vname field
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        name="Edate"
        value={formData.Edate}
        onChange={handleChange} // Trigger handleChange for Edate field
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default TaskForm;
