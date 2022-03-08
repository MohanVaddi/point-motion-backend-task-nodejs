const express = require('express');
const usersData = require('../database/users.json');
const jwt = require('jsonwebtoken');
const { verify } = require('../tools/hash');

const router = express.Router();

module.exports = router.use('/', async (req, res) => {
    const { username, password } = req.body;
    const user = usersData.findIndex((ele) => ele.username === username);


    if (!username || !password) {
        res.status(400).json({
            result: false,
            error: 'Please provide username and password',
        });
    } else if (user === -1) {
        res.status(401).json({
            result: false,
            error: 'Invalid username/password',
        });
    } else {
        if (
            user !== -1 &&
            (await verify(password, usersData[user]?.password))
        ) {
            res.status(200).json({
                result: true,
                jwt: jwt.sign(
                    { username, firstname: usersData[user]?.fname },
                    process.env['JWT_SECRET']
                ),
                message: 'Signin success',
            });
        } else {
            res.status(401).json({
                result: false,
                error: 'Invalid username/password',
            });
        }
    }
});
