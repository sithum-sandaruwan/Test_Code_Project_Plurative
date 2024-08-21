require('dotenv').config();
const { OAuth2Client } = require("google-auth-library");
const { generators, Issuer } = require("openid-client");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


let codeVerifier = '';

exports.auth= async(req, res) => {

    codeVerifier = generators.codeVerifier();

    const codeChallenge = generators.codeChallenge(codeVerifier);

    const googleIssure = await Issuer.discover('https://accounts.google.com');

    const client = new googleIssure.Client({
        client_id: CLIENT_ID,
        cliend_secret: CLIENT_SECRET,
        redirect_uris: REDIRECT_URI,
        response_types: ['code']
    })

<<<<<<< HEAD
    const url = client.authorizationUrl(
        {
            scope: 'openid email profile',
=======
    const url =     client.authorizationUrl(
        {
            scope : 'openid email profile',
>>>>>>> d74d41a873bfeb621419099a381391c158e05684
            code_challenge: codeChallenge,
            code_challenge_method: S256
        }
    )

    res.redirect(url);
<<<<<<< HEAD
};

module.exports = {auth,codeVerifier};
=======
})
>>>>>>> d74d41a873bfeb621419099a381391c158e05684
