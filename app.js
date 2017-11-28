var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');

var myModules = require('./myModules');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.get('/home.html', function (req, res) {
    res.sendFile( __dirname + "/" + "home.html" );
})

app.post('/post_average', urlencodedParser, function (req, res) {

    // Create response object
    response = {
        time:req.body.time,
        date:req.body.date,
        average:req.body.average
    };
    var responseString = JSON.stringify(response);
    console.log(response);

    // Determine directory name and create if necessary
    filePath = __dirname + '/data/averages/' + response.date;
    myModules.ensureDirectoryExistence(filePath);

    // Append response string to data file
    var fileName = filePath + '_averages.txt';
    fs.appendFile(fileName, responseString + '\n', function (err) {
        if (err) throw err;
        console.log("Successfully written to " + fileName + ".");
    })

    // End POST processing
    res.end(responseString);
})

app.post('/post_pressure', urlencodedParser, function (req, res) {

    // Create response object
    response = {
        time:req.body.time,
        date:req.body.date,
        pressure:req.body.pressure
    };
    var responseString = JSON.stringify(response);
    conseole.log(response);

    // Determine directory name and create if necessary
    filePath = __dirname + '/data/pressure_readings/' + response.date;
    myModules.ensureDirectoryExistence(filePath);

    // Append response string to data file
    var fileName = filePath + '_pressure_readings.txt';
    fs.appendFile(fileName, responseString + '\n', function (err) {
        console.log("Successfully written to " + fileName + ".");
    })

    // End POST processing
    res.end(responseString);
})

var server = app.listen(8080, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at htp://%s:%s", host, port)
})
