const bodyParser = require('body-parser');
const { query, text } = require('express');
const {Pool} = require ('pg');

const pool = new Pool({
    user : 'postgres',
    password : 'Sikka@323',
    host : 'localhost',
    port : '5432',
    database : 'test_code_project_plurative'
});


module.exports = {
    query : (text,params) => pool.query(text,params)
}