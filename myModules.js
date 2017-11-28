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
