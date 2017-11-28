var fs = require('fs');
var path = require('path');

exports.query = function(req, res) {
    if (req.method == 'POST') {
        console.log("POST");
        var body = '';

        req.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });

        if (body.length > 1e6)
            req.connection.destroy();
        }

        req.on('end', function () {
            var post = JSON.parse(body);
            return post;
        });
    }


exports.ensureDirectoryExistence = function(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    exports.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

// Pressure sensors in JSON form
exports.sensor1 = {
    "sensorID":"Sensor 1",
    "yIntercept":"1",
    "slope":"1"
}

exports.sensor2 = {
    "sensorID":"Sensor 2",
    "yIntercept":"2",
    "slope":"2"
}

exports.sensor3 = {
    "sensorID":"Sensor 3",
    "yIntercept":"3",
    "slope":"3"
}

exports.sensor4 = {
    "sensorID":"Sensor 4",
    "yIntercept":"4",
    "slope":"4"
}

exports.sensor5 = {
    "sensorID":"Sensor 5",
    "yIntercept":"5",
    "slope":"5"
}

exports.sensor6 = {
    "sensorID":"Sensor 6",
    "yIntercept":"6",
    "slope":"6"
}

exports.sensor7 = {
    "sensorID":"Sensor 7",
    "yIntercept":"7",
    "slope":"7"
}

exports.sensor8 = {
    "sensorID":"Sensor 8",
    "yIntercept":"8",
    "slope":"8"
}
