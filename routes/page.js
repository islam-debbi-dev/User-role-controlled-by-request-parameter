const express = require('express');
const {isAuthenticated,ifIsNotAuthenticatedRedirectTologin} = require('../middlewares/isAuthenticated');
const {isAdmin} = require('../middlewares/is-admin');
const router = express.Router();

// home page
    router.get('/', (req, res) => {
        res.status(200).render('home-page.ejs');
    });

//login page
router.get('/login', (req, res) => {
    res.status(200).render('login-page.ejs');
});


router.get('/account', ifIsNotAuthenticatedRedirectTologin, (req, res) => {
    const username = req.session.user.username; 
    
    const isAdmin = req.cookies.isAdmin === 'true';
    res.render('account-page.ejs', { username, isAdmin });
});

router.get('/manage-users', isAuthenticated, (req, res) => {
    const isAdmin = req.cookies.isAdmin === 'true';
    console.log(`manage ${isAdmin}`);
    if (!isAdmin) {
        return res.status(403).send('Access denied.');
    }
    res.status(200).render('manage-users.ejs');
});

module.exports = router; 