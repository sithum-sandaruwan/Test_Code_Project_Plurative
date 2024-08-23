require('dotenv').config();
const express = require('express');
const db = require('./model/users');
const routers = require('./routes/app-routes');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(routers);



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


