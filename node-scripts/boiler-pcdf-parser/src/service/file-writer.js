var jsonfile = require('jsonfile');

var fileWriter = {};

fileWriter.saveJsonFile = function(data, fileName) {
    var filePath = 'outputs/' + fileName;
    jsonfile.writeFile(filePath, data, {spaces: 2}, function(error) {
        if(error) {
            throw error;
        }
    })
};

module.exports = fileWriter;