const multer = require('multer');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');

const storage = new GridFsStorage({
	url: process.env.DATABASE_URL,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filenameWithoutExtension = file.originalname.split('.')[0];
				const fileInfo = {
					filename: filenameWithoutExtension,
					bucketName: 'thumbnails',
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });

module.exports = { upload };
