const express = require('express');
const router = express.Router();
const { User } = require('../models').models;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

module.exports = router;
