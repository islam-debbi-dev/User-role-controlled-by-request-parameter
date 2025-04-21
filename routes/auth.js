const express = require('express');
const {users} = require('../models/user');
const router = express.Router();



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
    res.cookie('isAdmin', user.isAdmin.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 24 * 60 * 60 * 1000 
    });
    // Create a new session
    req.session.user = {
        username: user.username,
       // isAdmin: user.isAdmin 
    };

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
    res.json(users); 
});

module.exports = router;
