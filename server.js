const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

const app = express();
dotenv.config();
// ejs 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Middleware to parse JSON request body
app.use(express.json());

// Configure session middleware
app.use(
    session({
        name: 'sessionIdtset',
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);


app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/page'));

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}/login`);
});