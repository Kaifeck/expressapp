const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('www'));

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/www/index.html`)
});
app.get('/sample', function (req, res) {
    res.sendFile(`${__dirname}/www/sample.html`)
});
app.listen(port, function() {
    console.log(`App listening on port ${port}`)
});