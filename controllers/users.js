const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js')

router.post('/', (req, res) => {
    console.log('test user route');
    req.body.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    User.create(req.body, (error, createdUser) => {
        res.json(createdUser)
        console.log(error)
        console.log(createdUser)
    })
})

module.exports = router;
