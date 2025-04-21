const express = require('express');

// Middleware to check if user is authenticated
function isAuthenticated  (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};
function ifIsNotAuthenticatedRedirectTologin  (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = {isAuthenticated, ifIsNotAuthenticatedRedirectTologin};