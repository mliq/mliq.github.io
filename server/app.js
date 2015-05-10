var express = require('express');
var app = express();

var path = require('path');

// We don't set if heroku has set it in .env
app.set('port', (process.env.PORT || 5000));


app.get('/project1', function (req, res) {
    // If a request has a first parameter, get that file, otherwise index
    var file = req.params[0] || '../views/project1.html';
    // Send the file located at current dir/public/file
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('img/mary_fruit_stand.jpeg', function (req, res) {
    // If a request has a first parameter, get that file, otherwise index
    var file = req.params[0] || 'img/mary_fruit_stand.jpeg';
    // Send the file located at current dir/public/file
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/contact', function (req, res) {
    // If a request has a first parameter, get that file, otherwise index
    var file = req.params[0] || '../views/contact.html';
    // Send the file located at current dir/public/file
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/projects', function (req, res) {
    // If a request has a first parameter, get that file, otherwise index
    var file = req.params[0] || '../views/projects.html';
    // Send the file located at current dir/public/file
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/*', function (req, res) {
    // If a request has a first parameter, get that file, otherwise index
    var file = req.params[0] || '../views/index.html';
    // Send the file located at current dir/public/file
    res.sendFile(path.join(__dirname, 'public', file));
});

app.listen(app.get('port'), function () {
    console.log('App is running on port: ', app.get('port'));
});