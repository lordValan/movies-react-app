const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const moviesRoute = require('./routes/movies');
const constants = require('./constants');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(moviesRoute);
app.use(express.static('dist'));
app.get('*', function(req, res) {
    res.sendFile('index.html', { root: `${__dirname}/../dist` });
});

const PORT = constants.APP_PORT;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));