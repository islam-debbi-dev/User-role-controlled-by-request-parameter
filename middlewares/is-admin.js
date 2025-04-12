const express = require('express');

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        // User is an admin, proceed to the next middleware or route handler
        return next();
    }
    // User is not an admin, deny access
    res.status(403).send('Access denied. Admins only.');
};

module.exports = {isAdmin};