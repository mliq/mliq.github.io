var express = require('express');
var app = express();

var path = require('path');

// We don't set if heroku has set it in .env
app.set('port', (process.env.PORT || 5000));

app.get('/*', function (req, res) {
    // If a request has a first parameter, get that file, otherwise index
    var file = req.params[0] || '../views/index.html';
    // Send the file located at current dir/public/file
    res.sendFile(path.join(__dirname, 'public', file));
});

app.listen(app.get('port'), function () {
    console.log('App is running on port: ', app.get('port'));
});