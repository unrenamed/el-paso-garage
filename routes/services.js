const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('Fuck you');
});

const sendInternalServerError = (res) => {
	res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

module.exports = router;
