const express = require('express');
const dotenv = require('dotenv');
const User = require('./models/user');
const app = express();
dotenv.config();


// Middleware to parse JSON request body
app.use(express.json());



app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 5000;








app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});