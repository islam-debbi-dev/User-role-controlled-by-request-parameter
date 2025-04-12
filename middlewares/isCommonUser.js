
// Middleware to check if user is common user
function  isCommonUser  (req, res, next)  {
    if (req.session.user && req.session.user.isAdmin === false) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

module.exports = {isCommonUser};