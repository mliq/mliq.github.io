var express = require('express');
var app = express();

var path = require('path');
var fileArray = require('./file_list.js');

var patterns = fileArray(path.join(__dirname, 'public/img/patterns'));
var i = 1;
console.log(patterns);

// We don't set if heroku has set it in .env
app.set('port', (process.env.PORT || 5000));

app.get('/patterns', function (req, res) {
    if (i >= (patterns.length - 1)) {
        i = 1;
    } else {
        i++;
    }
    res.send(patterns[i]);
});

app.get('/p/*', function (req, res) {
    var file = '/img/' + req.params[0] || 'img/mary_fruit_stand.jpeg';
    console.log('ya' + file);
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/img/*', function (req, res) {
    console.log("la la" + req.path);
    var file = 'img/patterns/' + req.params[0];
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/project1.json', function (req, res) {
    var file = req.params[0] || '../project1.json';
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/projectTemplate', function (req, res) {
    var file = req.params[0] || '../views/projectTemplate.html';
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/contact', function (req, res) {
    var file = req.params[0] || '../views/contact.html';
    res.sendFile(path.join(__dirname, 'public', file));
});

app.get('/projects', function (req, res) {
    var file = req.params[0] || '../views/projects.html';
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