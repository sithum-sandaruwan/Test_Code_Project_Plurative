require('dotenv').config();
const express = require('express');
const db = require('./auth-callback');
const { OAuth2Client } = require('google-auth-library');
const authCallback = require('./auth-callback');
const app = express();
const PORT = 3000;

//test code
app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

//Test Code for check the server running
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is successfully running")
    else
        console.log("error occured")
});
