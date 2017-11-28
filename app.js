// Required modules
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var http = require('http');
var nodemailer = require('nodemailer');
var path = require('path');
var url = require('url');

// My modules
var myModules = require('./myModules');

// Initial variables
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var address = "127.0.0.1";
var port = "8080";

// Nodemailer transporter
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alertsll17@gmail.com',
        pass: 'seniordesignpassword',
    }
});

// Nodemailer email information
var mailOptions = {
    from: 'alertsll17@gmail.com',
    to: 'csjohns6@ncsu.edu',
    subject: 'The POST worked!',
    text: 'This is a test post. Please ignore.'
};

// Create the express server
app.use(express.static('public'));
app.get('/home.html', function (req, res) {
    res.sendFile( __dirname + "/" + "home.html" );
})

// Process average offloads POST
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

    // Send average update in email
    mailOptions.text = "Status update for " + response.date + " at " + response.time + ".\n";
    mailOptions.text += "There was an average of " + response.average + " offloads per hour.\n\n"
    mailOptions.text += "Check it out at http://" + address + ":" + port;

    console.log("Preparing nodemailer...");
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    // End POST processing
    res.end(responseString);
})

// Process individual pressure reading POST
app.post('/post_pressure', urlencodedParser, function (req, res) {

    // Create response object
    response = {
        time:req.body.time,
        date:req.body.date,
        pressure:req.body.pressure
    };
    var responseString = JSON.stringify(response);
    console.log(response);

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

var server = app.listen(port, address, function () {
    var host = server.address().address
    var activePort = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})
