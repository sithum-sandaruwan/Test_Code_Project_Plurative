require('dotenv').config();
const { Issuer } = require("openid-client");
const pool = require("../model/users");
const { codeVerifier } = require("./auth-controller");
const auth= require("./auth-controller");
const { query } = require('express');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


exports.authCallBack = async (req, res) => {

    try {
        const code = req.query;

        const googleIssure = await Issuer.discover("https://accounts.google.com");

        const client = new googleIssure.Client({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uris: REDIRECT_URI,
            response_types: 'code'
        })

        const tokens = await client.callback(REDIRECT_URI, { code }, { code_verifier: codeVerifier });

        const accessToken = tokens.access_token;

        const userInfo = await client.userinfo(accessToken);
        const user = userInfo;

        const query = 'INSERT INTO user (google_id,name,email) VALUES ($1,$2,$3) ON CONFLICT (google_id) DO NOTHING';

        const values = [user.sub, user.name, user.email];
        await pool.query(query, values);

        res.redirect('/token?access_token=${accessToken}');
    }

    catch (error) {
        console.error('Error in /auth-callback:', error);
        res.status(500).send('500 Internal Server Error');
    }
};
