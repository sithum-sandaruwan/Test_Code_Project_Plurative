const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is successfully running")
    else
        console.log("error occured")
});
