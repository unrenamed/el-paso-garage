const express = require('express');
const router = express.Router();
const withAuth = require('./middleware');
const jwt = require('jsonwebtoken');
const { User } = require('../models').models;

/* POST register new user */
router.post('/register', (req, res) => {
	const { email, password, name, age } = req.body;
	const user = new User({ email, password, name, age });
	user.save((err) => {
		if (err) {
			res.status(500).send('Error registering new user. Please, try again!');
		} else {
			res.status(200).send(`Successfully registered new user with email: ${email}`);
		}
	});
});

/* POST authenticate user */
router.post('/authenticate', (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err) {
			sendInternalServerError(res);
		} else if (!user) {
			sendIncorrectEmailOrPasswordError(res);
		} else {
			user.isCorrectPassword(password, (err, same) => {
				if (err) {
					sendInternalServerError(res);
				} else if (!same) {
					sendIncorrectEmailOrPasswordError(res);
				} else {
					const payload = { email };
					const token = jwt.sign(payload, process.env.AUTH_SECRET, {
						expiresIn: '1h'
					});
					res.cookie('token', token, { httpOnly: true }).sendStatus(200);
				}
			});
		}
	});
});

router.get('/checkToken', withAuth, (req, res) => {
	res.sendStatus(200);
});


const sendInternalServerError = (res) => {
	res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

const sendIncorrectEmailOrPasswordError = (res) => {
	res.status(401).json({ error: 'Incorrect email or password' });
};

module.exports = router;
