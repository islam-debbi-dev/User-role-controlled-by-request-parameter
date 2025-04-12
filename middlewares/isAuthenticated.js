const express = require('express');

// Middleware to check if user is authenticated
function isAuthenticated  (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = {isAuthenticated};