const express = require('express');
const session = require('express-session');

const  User  = require('../models/user');
const router = express.Router();


// create tow users for testing
const user1 = new User(1, 'admin', 'password123', true);
const user2 = new User(2, 'commonuser', 'password456', false);
const user3 = new User(3, 'user3', 'password789', false);
const users = [user1, user2, user3];

// Configure session middleware
router.use(
    session({
        name: 'sessionIdtset',
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

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

    // Destroy the previous session if it exists
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
            }
        });
    }

    // Create a new session
    req.session.user = { username: user.username, isAdmin: user.isAdmin };
    console.log(req.session.user);

    res.status(200).send('Login successful');
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.status(200).send('Logout successful');
    });
});
// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin === true) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};
// Middleware to check if user is common user
const isCommonUser = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin === false) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

// page for admin only
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.status(200).send('Welcome Admin!');
});
// page for common user only
router.get('/user', isAuthenticated, isCommonUser, (req, res) => {
    res.status(200).send('Welcome Common User!');
});
// page for all authenticated users
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.status(200).send('Welcome to the dashboard!');
});
module.exports = router; // Ensure the router is exported
