const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
let moviesRoute = require('./routes/movies');

dotenv.config();

app.use(bodyParser.json());

app.use(moviesRoute);
app.use(express.static('dist'));
app.get('*', function(req, res) {
    res.sendfile('./dist/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));