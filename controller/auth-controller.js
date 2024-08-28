

require('dotenv').config();
const { OAuth2Client } = require("google-auth-library");
const { generators, Issuer } = require("openid-client");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let codeVerifier = generators.codeVerifier();

exports.getAuth = async (req, res) => {

    const codeChallenge = generators.codeChallenge(codeVerifier);

    const googleIssure = await Issuer.discover('https://accounts.google.com/.well-known/openid-configuration');

    const state = generators.state();

    const client = new googleIssure.Client({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uris: [REDIRECT_URI],
        response_types: ["code"],
    })

    const url = client.authorizationUrl(
        {
            redirect_uri: REDIRECT_URI,
            scope: 'openid email profile',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            state,
        }
    );

    console.log("Authorization URI:", url);
    res.redirect(url);
};

exports.codeVerifier;