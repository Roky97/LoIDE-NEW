const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const port = 9000;

var pckg = require('./package.json');

app.use(helmet());
app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/version', function (req, res) { // send the version (and take it in package.json) of the application
    res.send('{"version":"' + pckg.version + '"}');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})