fs = require('fs');

var fileArray = function(dir){
    return fs.readdirSync(dir);
};

module.exports = fileArray;