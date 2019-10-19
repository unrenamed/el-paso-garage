const express = require('express');
const router = express.Router();
const withAuth = require('./middleware');
const { User } = require('../models').models;

router.get('/logged', withAuth, (req, res) => {
	User.findOne({ email: req.email }, { password: 0 }, (err, user) => {
		res.json(user);
	});
});

router.get('/checkEmail', (req, res) => {
	const { email } = req.query;
	User.countDocuments({ email }, (err, count) => {
		if (err) {
			sendInternalServerError(res);
		}

		if (count > 0) {
			res.status(400).json({ error: 'E-mail has already been used. Please, enter another email.' });
		} else {
			res.status(200).send();
		}
	});
});

const sendInternalServerError = (res) => {
	res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

module.exports = router;
