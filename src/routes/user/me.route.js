const express = require('express');
const auth = require('../../middleware/auth');
const usersData = require('../../database/users.json');

const router = express.Router();

module.exports = router.use('/', auth, (req, res) => {
    const user = usersData.findIndex(
        (ele) => ele.username === req.user.username
    );

    res.status(200).json({
        result: true,
        data: {
            fname: usersData[user]?.fname,
            lname: usersData[user]?.lname,
            password: usersData[user]?.password,
        },
    });
});
