require('dotenv').config();
const { OAuth2Client } = require("google-auth-library");
const { generators, Issuer } = require("openid-client");
const{AuthState} = require('../../models')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;



exports.getAuth = async (req, res) => {

    let codeVerifier = generators.codeVerifier();

    const codeChallenge = generators.codeChallenge(codeVerifier);

    const googleIssure = await Issuer.discover('https://accounts.google.com');

    const state = generators.state();

    await AuthState.create({state});

    const client = new googleIssure.Client({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uris: [REDIRECT_URI],
        response_types: ["code"],
    })

    const url = client.authorizationUrl(
        {
            redirect_uri: REDIRECT_URI,
            scope: 'openid email profile ',
            code_challenge: codeChallenge,
            code_challenge_method: 'S256',
            access_type:'offline',
            state,
        }
    );

    console.log("Authorization URI:", url);
    res.json({url,codeVerifier});
};

exports.codeVerifier;