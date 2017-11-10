var http = require("http");

var client = {};

client.getPcdf = function(success) {
    var options = {
        host: 'www.boilers.org.uk',
        path: '/data1/pcdf2012.dat'
    };
    http.get(options, function(result) {
        var bodyChunks = [];
        result.on('data', function(chunk) {
            bodyChunks.push(chunk);
        })
            .on('end', function() {
                var body = Buffer.concat(bodyChunks).toString();
                success(body);
            });

        result.on('error', function(e) {
            console.log('ERROR: ' + e.message);
        })
    });
};

module.exports = client;