const JWT = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

exports.JWT = (req, res) => {
    const { access_token } = req.query;
    const payload = { access_token };
    const token = JWT.sign(payload, SECRET_KEY, { expiresIn: '30m' });

    res.json({token});
}