const { Model, DataTypes } = require('sequelize');
const jose = require('jose');
const{SignInKey} = require('../model');

module.generateSigninKey = async()=>{
    const {publicKey,privateKey} = await jose.generateKeyPair('RS256');
    const privateKeyPem = await jose.exportPKCS8(privateKey);
    const publicKeyPem = await jose.exportPKCS8(publicKey);

    await SignInKey.create({
        signing_key: privateKeyPem,
        expires_at: new Date(Date.now() + 90*24*60*60*1000),
        is_revoked : false,
    });

    return{privateKeyPem,publicKeyPem};
}