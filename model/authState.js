const { Model, Datatypes } = require('sequelize');

module.exports = (sequelize) => {

    class AuthState extends Model { }

    AuthState.init({
        state: Datatypes.STRING,
    },
    {
        sequelize,
        modelName: 'AuthState',
    });

    return AuthState;
}