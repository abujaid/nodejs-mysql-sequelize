var express = require('express');
var router = express.Router();
const model = require('../models/index');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET users listing. */
router.get('/', (req, res, nex) => {
  model.User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt']
  })
    .then(user => res.json({
      error: false,
      user: user
    })).catch(error => res.json({
      error: true,
      error: error
    }));
});

// Register users
// router.post('/', (req, res, next) => {

//   const {
//     firstName,
//     lastName,
//     email,
//     password
//   } = req.body;
//   model.User.create({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password
//   }).then(user => res.status(201).json({
//     error: false,
//     data: user,
//     message: 'New user has been register.'
//   })).catch(error => res.json({
//     error: true,
//     data: [],
//     error: error
//   }));
// });

router.post('/', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    model.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash
    }).then(user => res.status(201).json({
      error: false,
      data: user,
      message: 'New user has been register.'
    }));
  });
});


module.exports = router;
