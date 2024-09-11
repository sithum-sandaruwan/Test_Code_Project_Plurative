require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Issuer, generators } = require("openid-client");
const pool = require("../model/users");
const { codeVerifier } = require("./auth-controller");
const auth = require("./auth-controller");
const { query } = require('express');
const { User, AuthState, UserToken, SignInKey } = require('../../models');
const { generateSinginKey } = require('../../utils/signinKey');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


exports.authCallBack = async (req, res) => {
    const { code, state, codeVerifier } = req.body;

    const authState = await AuthState.findOne({ where: { state } });

    if (!authState) {
        return res.status(400).json({ error: 'Invalid state' })
    }

    try {


        const googleIssure = await Issuer.discover("https://accounts.google.com");

        const client = new googleIssure.Client({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uris: REDIRECT_URI,
            response_types: 'code'
        })

        const tokens = await client.callback(REDIRECT_URI, { code, state }, { code_verifier: codeVerifier });

        const accessToken = tokens.access_token;

        const userInfo = await client.userinfo(accessToken);
        const { sub, emial } = userInfo;

        let user = await User.findOne({ where: { oauthId: sub } });

        if (!user) {
            user = await User.create({ username: email, oauthId: sub });
        }

        const app_refresh_token = generators.random();

        await UserToken.create({
            nonce: generators.nonce(),
            code_challenge: codeChallenge,
            origin_url: req.headers.referer,
            user_id: user.id,
            idp_subject_id: sub,
            idp_access_token: tokenSet.access_token,
            idp_access_token_expires_at: new Date(tokens.expires_at * 1000),
            idp_refresh_token: tokens.refresh_token,
            app_refresh_token: app_refresh_token,
            app_refresh_token_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        const { privateKeyPem } = await generateSinginKey();

        const token = jwt.sign({ id: user.id, username: user.username }, privateKeyPem, { algorithm: 'RS256', expiresIn: '1h' });

        res.json({token,refresh_token:app_refresh_token});

        // const query = 'INSERT INTO user (google_id,name,email) VALUES ($1,$2,$3) ON CONFLICT (google_id) DO NOTHING';

        // const values = [user.sub, user.name, user.email];
        // await pool.query(query, values);

        // res.redirect('/token?access_token=${accessToken}');
    }

    catch (error) {
        console.error('Error in /auth-callback:', error);
        res.status(500).send('500 Internal Server Error');
    }
};

