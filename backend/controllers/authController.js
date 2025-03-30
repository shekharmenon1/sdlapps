const User = require('../models/User');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        name: user.name,
        email: user.email,
        university: user.university,
        address: user.address,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name, email, university, address } = req.body;
        user.name = name || user.name;
        user.email = email || user.email;
        user.university = university || user.university;
        user.address = address || user.address;

        const updatedUser = await user.save();
        res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email, university: updatedUser.university, address: updatedUser.address, token: generateToken(updatedUser.id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    const { Ename, Vname, Edate } = req.body;
    try {
        const eventExists = await Event.findOne({ Ename });
        if (eventExists) {
            return res.status(400).json({ message: 'Event with this name already exists' });
        }
        const event = await Event.create({ Ename, Vname, Edate });
        console.log("Event Created");
        return res.status(201).json({
            id: event.id,
            Ename: event.Ename,
            Vname: event.Vname,
            Edate: event.Edate,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    console.log('Going to edit page');
    try {
        const event = await Event.findOne({ Ename: req.params.Ename }); 
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { Ename, Vname, Edate } = req.body;

        event.Ename = Ename || event.Ename;
        event.Vname = Vname || event.Vname;
        event.Edate = Edate || event.Edate;

        const updatedEvent = await event.save();

        console.log("Event updated");
        return res.json({
            id: updatedEvent.id,
            Ename: updatedEvent.Ename,
            Vname: updatedEvent.Vname,
            Edate: updatedEvent.Edate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




const getEvent = async (req, res) => {
    const eventname = req.query.eventName;
    try {
        const event = await Event.findOne({ Ename: eventname });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        console.log("Event found");
        return res.status(200).json({
            id: event.id,
            Ename: event.Ename,
            Vname: event.Vname,
            Edate: event.Edate,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ Ename: req.params.Ename });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await event.deleteOne(); // Deletes the event from the database
        console.log("Event Deleted");
        return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser, loginUser, updateUserProfile, getProfile, createEvent, updateEvent, getEvent, deleteEvent };
