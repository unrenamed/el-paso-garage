const express = require('express');
const router = express.Router();
const { Service } = require('../models').models;

router.get('/:titleId/info', (req, res, next) => {
	const { titleId } = req.params;
	Service.findOne({ titleId }, (err, service) => {
		if (err) sendInternalServerError(res);
		res.json(service);
	});
});

router.get('/:type', (req, res, next) => {
	const { type } = req.params;
	Service.find({ type }, (err, services) => {
		if (err) sendInternalServerError(res);
		res.json(services);
	});
});

const sendInternalServerError = (res) => {
	res.status(500).json({ error: 'Internal server error. Please, try again.' });
};

module.exports = router;
