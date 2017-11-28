var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');

var my_modules = require('./my_modules');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/home.html', function (req, res) {
    res.sendFile( __dirname + "/" + "home.html" );
})

app.post('/post_average', urlencodedParser, function (req, res) {
    response = {
        time:req.body.time,
        date:req.body.date,
        average:req.body.average
    };
    console.log(response);
    var output = JSON.stringify(response);
    filePath = __dirname + '/data/' + response.date;
    my_modules.ensureDirectoryExistence(filePath);

    var fileName = filePath + '_averages.txt';
    fs.appendFile(fileName, output + '\n', function (err) {
        if (err) throw err;
        console.log("Successfully written to " + fileName + ".");
    })
    res.end(output);
})

app.post('/post_pressure', urlencodedParser, function (req, res) {
    response = {
        time:req.body.time,
        date:req.body.date,
        pressure:req.body.pressure
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

var server = app.listen(8080, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at htp://%s:%s", host, port)
})
