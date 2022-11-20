require('dotenv').config();
require('./context/data.context').connect();
const express = require('express');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Pantree - Shopping API v1.0.0');
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}...`);
});
