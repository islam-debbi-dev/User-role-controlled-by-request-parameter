const express = require('express');
const {isAuthenticated} = require('../middlewares/isAuthenticated');
const router = express.Router();

//login page
router.get('/login', (req, res) => {
    res.status(200).render('login-page.ejs');
});


router.get('/account', isAuthenticated, (req, res) => {
    const username = req.session.user.username;
    const isAdmin = req.session.user.isAdmin; 
    res.render('account-page.ejs', { username, isAdmin });
});

router.get('/manage-users', isAuthenticated, (req, res) => {
    res.status(200).render('manage-users.ejs');
});

module.exports = router; // Ensure the router is exported
