const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class SignInKey extends Model { }

    SignInKey.init({
        signing_key: DataTypes.STRING,
        expires_at: DataTypes.DATE,
        is_revoked: DataTypes.BOOLEAN,
    },
    {
        sequelize,
        modelName: 'SignInKey',

    });

    return SignInKey;
}