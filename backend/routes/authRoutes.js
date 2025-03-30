const express = require('express');
const { 
  registerUser, 
  loginUser, 
  updateUserProfile, 
  getProfile, 
  createEvent, 
  updateEvent, 
  getEvent, 
  deleteEvent 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// User-related routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

// Event-related routes
router.post('/tasks', createEvent); // Create a new event/task
router.put('/tasks/:Ename', updateEvent); // Update event/task by event name
router.get('/tasks', getEvent); // Get events/tasks
router.delete('/tasks/:Ename', deleteEvent); // Delete event/task by event name

module.exports = router;
