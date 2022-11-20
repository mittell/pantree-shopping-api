const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Pantree - Shopping API v1.0.0');
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}...`);
});
