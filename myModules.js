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
    "yIntercept":"300.7",
    "slope":"1.451"
}

exports.sensor2 = {
    "sensorID":"Sensor 2",
    "yIntercept":"220.29",
    "slope":"1.5294"
}

exports.sensor3 = {
    "sensorID":"Sensor 3",
    "yIntercept":"59.727",
    "slope":"1.5537"
}

exports.sensor4 = {
    "sensorID":"Sensor 4",
    "yIntercept":"143.73",
    "slope":"1.0885"
}

exports.sensor5 = {
    "sensorID":"Sensor 5",
    "yIntercept":"4.628",
    "slope":"1.38"
}

exports.sensor6 = {
    "sensorID":"Sensor 6",
    "yIntercept":"158.12",
    "slope":"1.1327"
}

exports.sensor7 = {
    "sensorID":"Sensor 7",
    "yIntercept":"172.27",
    "slope":"1.0071"
}

exports.sensor8 = {
    "sensorID":"Sensor 8",
    "yIntercept":"-23.171",
    "slope":"1.1008"
}

exports.sensor9 = {
    "sensorID":"Sensor 9",
    "yIntercept":"141.23",
    "slope":"0.9386"
}
