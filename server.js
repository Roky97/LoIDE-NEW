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

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`LoIDE-PWA ${pckg.version} is listening at http://localhost:${port}`)
})