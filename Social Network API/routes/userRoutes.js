const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure correct path

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users); // Send users as a response
    } catch (error) {
        console.error('Error fetching users:', error.message); // Log detailed error
        res.status(500).json({ message: 'Server error' });
    }
});

// GET a single user by _id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Fetch user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Send user as a response
    } catch (error) {
        console.error('Error fetching user:', error.message); // Log detailed error
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body; // Get data from request body
    try {
        // Check for required fields
        if (!username || !email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }
        
        // Create new user instance
        const newUser = new User({ username, email, password });
        await newUser.save(); // Save user to the database
        res.status(201).json(newUser); // Send created user as a response
    } catch (error) {
        console.error('Error creating user:', error.message); // Log detailed error
        res.status(400).json({ message: 'Error creating user' });
    }
});



// PUT to update a user by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser); // Send updated user as a response
    } catch (error) {
        console.error('Error updating user:', error.message); // Log detailed error
        res.status(400).json({ message: 'Error updating user' });
    }
});

// DELETE to remove user by _id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete user
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' }); // Send success message
    } catch (error) {
        console.error('Error deleting user:', error.message); // Log detailed error
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
