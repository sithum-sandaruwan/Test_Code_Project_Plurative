const bodyParser = require('body-parser');
const { query, text } = require('express');
const {Pool} = require ('pg');
const {Model,DataTypes} = require('sequelizer');

const pool = new Pool({
    user : 'postgres',
    password : 'Sikka@323',
    host : 'localhost',
    port : '5432',
    database : 'test_code_project_plurative'
});

//create the User table in the database and save the data.
module.exports = (sequelize) => {

    class User extends Model {}

    User.init({
        username: DataTypes.STRING,
        oAuthID: DataTypes.STRING,
    },
    {
        sequelize,
        modelName : 'User',
    })

    return User;

    // query : (text,params) => pool.query(text,params)
}