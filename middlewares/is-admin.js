const express = require('express');

function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.isAdmin === 'true') {
        return next();
    }
    res.status(403).send('Access denied. Admins only.');
};

module.exports = {isAdmin};