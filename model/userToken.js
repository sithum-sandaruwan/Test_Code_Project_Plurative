const { Model, Datatypes } = require('sequelize');


module.exports = (sequelize) => {

    //Save user token details in the Usertoken table in the database
    class UserToken extends Model {}

    UserToken.init({
        nonce : Datatypes.STRING,
        user_id : Datatypes.UUID,
        code_challenge : Datatypes.STRING,
        origin_url : Datatypes.STRING,
        idp_subject_id : Datatypes.STRING,
        idp_access_token : Datatypes.STRING,
        idp_access_token_expires_at : Datatypes.DATE,
        idp_refresh_token : Datatypes.STRING,
        app_refresh_token : Datatypes.STRING,
        app_refresh_token_expires_at : Datatypes.DATE,
        
    },{
        sequelize,
        modelName : 'UserToken',
    })

    return UserToken;
}