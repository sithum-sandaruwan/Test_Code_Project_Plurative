const { OAuth2Client } = require("google-auth-library");
const { generators, Issuer } = require("openid-client");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const OAuth2Client = new OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);

let codeVerifier = '';

app.get('/auth',async(req,res)=>{

    codeVerifier = generators.codeVerifier();

    const codeChallenge = generators.codeChallenge(codeVerifier);

    const googleIssure = await Issuer.discover('https://accounts.google.com');

    const client = new googleIssure.Client({
        client_id:CLIENT_ID,
        cliend_secret:CLIENT_SECRET,
        redirect_uris:REDIRECT_URI,
        response_types:['code']
    })

    const url =     client.authorizationUrl(
        {
            scope : 'openid email profile',
            code_challenge: codeChallenge,
            code_challenge_method: S256
        }
    )

    res.redirect(url);
})