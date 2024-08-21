require('dotenv').config();
const { Issuer } = require("openid-client");
const pool = require("../model/users");
const {codeVerifier} = require("./auth-controller");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


<<<<<<< HEAD
exports.authCallBack = async (req, res) => {

    const code = req.query;

    const googleIssure = await Issuer.discover("https://accounts.google.com");

    const client = new googleIssure.Client({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uris: REDIRECT_URI,
        response_types: 'code'
    })

    const tokens = await client.callback(REDIRECT_URI,{code},{code_verifier:codeVerifier});


}
=======
app.get('/auth-callback',async)
>>>>>>> d74d41a873bfeb621419099a381391c158e05684
