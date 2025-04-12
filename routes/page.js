const express = require('express');
const {isAuthenticated} = require('../middlewares/isAuthenticated');
const {isAdmin} = require('../middlewares/is-admin');
const {isCommonUser} = require('../middlewares/isCommonUser');
const router = express.Router();

//login page
router.get('/login', (req, res) => {
    res.status(200).render('login-page.ejs');
});


router.get('/account', isAuthenticated, (req, res) => {
    const { username } = req.session.user;
    const isAdmin = req.cookies.isAdmin === 'true'; 
    res.render('account-page.ejs', { username, isAdmin });
});

router.get('/manage-users', isAuthenticated,isAdmin, (req, res) => {
    res.status(200).render('manage-users.ejs');
});

module.exports = router; // Ensure the router is exported
