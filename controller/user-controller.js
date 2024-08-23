const { JWT } = require("google-auth-library");
const users = require("../model/users");
const pool = require("../model/users");

const SECRET_KEY = process.env.SECRET_KEY;

const authJwt = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split('')[1];

        JWT.verify(token, SECRET_KEY, (error, users) => {
            if (error) {
                return res.sendStatus(403)
            }
            req.users = users;

            next();
        })

        res.sendStatus(401);

    }


}

exports.getUsers = [authJwt, async (req, res) => {
    const result = await pool.query('SELECT * FROM user');

    res.json(result.rows);
}]