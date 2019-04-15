var express = require('express');
var router = express.Router();
const jsonWebToken = require('jsonwebtoken');
const model = require('../models/index');

const myJWTSecretKey = 'my-secret-key'; // set secret key, which we will use for creating and decoding JWT tokens, keep it safe.
router.post('/', (req, res, next) => {

    const { email, password } = req.body;

    model.User.findOne({
        where: { email: email, password: password },
        attributes: ['id', 'email'],
    }).then((user) => {
        console.log(user)
        const token = jsonWebToken.sign(user.dataValues, myJWTSecretKey);
        res.json({
            token_types: 'Bearer',
            expiresIn: '24h',
            token: token,
            email: email
        });
    }).catch((error) => {
        res.json(error);
    });



});
module.exports = router;