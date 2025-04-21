const express = require('express');

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        return next();
    }
    res.status(403).send('Access denied. Admins only.');
};

module.exports = {isAdmin};