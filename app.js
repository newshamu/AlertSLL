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

// Sensor variables
var sensorA = myModules.sensor1, sensorB = myModules.sensor2, sensorC = myModules.sensor3;

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
app.get('home.html', function (req, res) {
    res.sendFile( __dirname + "public/home.html" );
})

app.get('/averages.html', function (req, res) {
    res.sendFile( __dirname + "public/averages.html" );
})

app.get('/pressure.html', function (req, res) {
    res.sendFile( __dirname + "public/pressure.html" );
})

// Process average offloads POST
app.post('/postAverage', urlencodedParser, function (req, res) {

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
    mailOptions.text += "Check it out at http://" + address + ":" + port + "/home.html";

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
app.post('/postPressure', urlencodedParser, function (req, res) {

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

// Process updating sensors in use POST
app.post('/sensors', urlencodedParser, function (req, res) {

    res.sendFile( __dirname + "public/sensors.html" );

    // Set sensor variables in use
    sensorA = updateSensor(req.body.sensorA);
    sensorB = updateSensor(req.body.sensorB);
    sensorC = updateSensor(req.body.sensorC);

    console.log(sensorA);
    console.log(sensorB);
    console.log(sensorC);

    var response = "Sensors have been successfully updated!\n"
    response += "Sensor A = " + sensorA.sensorID + "\n";
    response += "Sensor B = " + sensorB.sensorID + "\n";
    response += "Sensor C = " + sensorC.sensorID;
    res.end(response);
});

// Create server
var server = app.listen(port, address, function () {
    var host = server.address().address
    var activePort = server.address().port

    console.log("App listening at http://%s:%s", host, port)

    console.log(sensorA);
    console.log(sensorB);
    console.log(sensorC);
})

function updateSensor(sensor) {
    // Set sensor value based on name
    if (sensor === "Sensor 1") {
        return myModules.sensor1;
    } else if (sensor === "Sensor 2") {
        return myModules.sensor2;
    } else if (sensor === "Sensor 3") {
        return myModules.sensor3;
    } else if (sensor === "Sensor 4") {
        return myModules.sensor4;
    } else if (sensor === "Sensor 5") {
        return myModules.sensor5;
    } else if (sensor === "Sensor 6") {
        return myModules.sensor6;
    } else if (sensor === "Sensor 7") {
        return myModules.sensor7;
    } else if (sensor === "Sensor 8") {
        return myModules.sensor8;
    } else {
        return myModules.sensor1;
    }
}

function old_updateSensor(sensor) {

    // Set sensor value based on name
    switch (sensor) {
        case "Sensor 1":
            return myModules.sensor1;
            break;
        case "Sensor 2":
            return myModules.sensor2;
            break;
        case "Sensor 3":
            return myModules.sensor3;
            break;
        case "Sensor 4":
            return myModules.sensor4;
            break;
        case "Sensor 5":
            return myModules.sensor5;
            break;
        case "Sensor 6":
            return myModules.sensor6;
            break;
        case "Sensor 7":
            return myModules.sensor7;
            break;
        case "Sensor 8":
            return myModules.sensor8;
            break;
        default:
            return myModules.sensor1;
            break;
    }
}
