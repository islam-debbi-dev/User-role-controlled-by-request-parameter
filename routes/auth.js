const express = require('express');
const User = require('../models/user');
const router = express.Router();


// create tow users for testing
const user1 = new User(1, 'admin', 'password123', true);
const user2 = new User(2, 'commonuser', 'password456', false);
const user3 = new User(3, 'user3', 'password789', false);
const users = [user1, user2, user3];

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        res.status(401).send('Invalid username or password');
        return;
    }
    if (user.password !== password) {
        res.status(401).send('Invalid username or password');
        return;
    }

    // user.isAdmin store it in cookies
    // res.cookie('isAdmin', user.isAdmin.toString(), {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    //     maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 24 hours
    // });
    // Create a new session
    req.session.user = {
        username: user.username,
        isAdmin: user.isAdmin 
    };
    console.log(req.session.user);

    res.status(200).send('Login successful');
});


// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('isAdmin'); 
    res.clearCookie('sessionIdTest'); 
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.status(200).send('Logout successful');
    });
});

// Fetch all users
router.get('/users', (req, res) => {
    res.json(users); // Send the users array as JSON
});

// Handle delete user
router.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users.splice(userIndex, 1); // Remove the user from the array
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router; // Ensure the router is exported
