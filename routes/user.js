const express = require('express');
const {users} = require('../models/user');
const router = express.Router();


// Handle delete user
router.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        console.log(userIndex);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users.splice(userIndex, 1); 
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router; 