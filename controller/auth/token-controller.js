const jwt = require('jsonwebtoken');
const { Issuer } = require('openid-client');
const { UserToken, SignInKey } = require('../../model');

const SECRET_KEY = process.env.SECRET_KEY;

exports.getToken = async (req, res) => {
    const { refreshToken } = req.body;
    const payload = { access_token };

    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const userToken = await UserToken.findOne({
            where: {
                app_refresh_token: refreshToken
            }
        });

        if (!userToken || new Date() > userToken.app_refresh_token_expires_at) {
            return res.status(401).json({ error: err.message });
        }

        const googleIssure = await Issuer.discover('https://accounts.google.com');
        const client = new googleIssure.Client({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uris: [process.env.RIDIRECT_URI],
            response_types: ['code'],
        })


        //checking the the access token validation
        if (new Date() > userToken.idp_access_token_expires_at) {
            if (userToken.idp_refresh_token && new Date() < userToken.idp_access_token_expires_at) {
                const tokens = await client.refresh(userToken.idp_refresh_token);
                userToken.idp_access_token = tokens.access_token;
                userToken.idp_access_token_expires_at = new Date(tokens.expires_at * 1000);

                await userToken.save();
            } else {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }

        const signing_key = await SignInKey.findOne({
            where: { is_revoked: false }, order: [['expires_at', 'DESC']]
        });

        const token = jwt.sign(
            { id: userToken.user_id, username: userToken.username, email: userToken.email },
            signingKey.signing_key,
            { algorithm: 'RS256', expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


}

