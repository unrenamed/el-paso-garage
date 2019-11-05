const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware');
const { User } = require('../models').models;
const { upload } = require('../utils/storage');
const { mongo, connection } = require('mongoose');
const Grid = require('gridfs-stream');

/* POST register new user */
router.post('/register', (req, res) => {
	const { email, password, firstName, lastName, phoneNumber } = req.body;
	const user = new User({ email, password, firstName, lastName, phoneNumber });
	user.save((err) => {
		if (err) {
			res.status(500).json({ error: 'Error registering new user. Please, try again!' });
		} else {
			res.status(200).json({ message: `Successfully registered new user with email: ${email}` });
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
					res.cookie('token', token, { httpOnly: true })
						.status(200)
						.json({ message: `Successfully authenticated user with e-mail: ${email}` });
				}
			});
		}
	});
});

/* GET logged user */
router.get('/loggedUser', withAuth, (req, res) => {
	User.findOne({ email: req.email }, { password: 0 }, (err, user) => {
		res.json(user);
	});
});

/* POST logout user */
router.post('/logout', withAuth, (req, res) => {
	res.clearCookie('token');
	res.status(200).json({ message: 'Successfully logged out user session.' });
});

/* POST upload thumbnail */
router.post('/thumbnails', upload.single('thumbnail'), (req, res) => {
	res.status(201).send();
});

/* GET fetch thumbnail by :filename param */
router.get('/thumbnails/:filename', (req, res) => {
	const gfs = Grid(connection.db, mongo);
	gfs.collection('thumbnails');
	gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
		// Check if file
		if (!file || file.length === 0) {
			return res.status(404).json({ error: 'No file exists' });
		}

		// Check if image
		if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
			// Read output to browser
			const readstream = gfs.createReadStream(file.filename);
			readstream.pipe(res);
		} else {
			res.status(404).json({ error: 'Not an image' });
		}
	});
});

const sendInternalServerError = (res) => {
	res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

const sendIncorrectEmailOrPasswordError = (res) => {
	res.status(401).json({ error: 'Incorrect email or password' });
};

module.exports = router;
