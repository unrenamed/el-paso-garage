const express = require('express');
const router = express.Router();
const withAuth = require('./middleware');
const { User } = require('../models').models;

/* GET users listing. */
router.get('/', withAuth, (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

module.exports = router;
