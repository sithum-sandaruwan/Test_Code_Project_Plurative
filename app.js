const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT,(error ) => {
    if(!error)
        console.log("Server is successfully running")
    else
        console.log("error occured")
});
