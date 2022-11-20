const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
	mongoose
		.connect(MONGO_URI)
		.then(() => {
			console.log('MongoDB connection established...');
		})
		.catch((error) => {
			console.log('MongoDB connection error...');
			console.error(error);
			process.exit(1);
		});
};
