const JWT = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

exports.getToken = async (req, res) => {
    const { refreshToken } = req.body;
    const payload = { access_token };
    

    try {
        const userToken = await UserToken.findOne({where:{
            app_refresh_token:refreshToken
        }});
        if (!userToken) {
            return res.status(400).json({error:'Refresh token is invalid'})
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '50m' });
        res.json({token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }

   
}