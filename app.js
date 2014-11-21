var express = require('express');
var app = express();
var http = require('http').Server(app);
var cylon = require('cylon');
var mongoose = require('mongoose');
var eegSnapshot = require('./models/eegSnapshot.js');
var db = mongoose.connection;
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var newData;
var avgData;
var avg1000Data;

//app.listen(process.env.PORT || port);
http.listen(port, function(){
    console.log('listening on *:' + port);
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
    console.log('a user connected');
});

mongoose.connect('mongodb://localhost/eeg');

db.on('error', console.error);
db.once('open',function callback(){
	console.log('db eeg ready');
});

cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0' },
  device: { name: 'headset', driver: 'neurosky' }
})
.on('ready', function(robot) {
  robot.headset.on('eeg', function(data) {
    addShot(	data.delta,
    			data.theta,
    			data.loAlpha,
    			data.hiAlpha,
    			data.loBeta,
                data.highBeta,
    			data.loGamma,
    			data.midGamma
    		),
    lastShot(),
    avgLastTen(),
    avgLast1000(),
    sendData(lastShot(),avgLastTen(),avgLast1000())
})})
.start();

/* Test for the addShot function

 setInterval(function(){ addShot(1,2,3,4,5,6,7); },1000);

*/

/*  Save a record to the database

*/


function addShot(delta, theta, loAlpha, hiAlpha, loBeta, loGamma, midGamma){
		   var newShot = new eegSnapshot({
	    		delta:    delta,
	    		theta:    theta,
	    		loAlpha:  loAlpha,
	    		hiAlpha:  hiAlpha,
	    		loBeta:   loBeta,
                hiBeta:   hiBeta,
	    		loGamma:  loGamma,
	    		midGamma: midGamma
    });
    console.log('Saving Shot to EEG Database: ' + '\n' + newShot + '\n');
    newShot.save(function (err) {if (err) console.log ('Error on save!')});
}

function lastShot(){
    eegSnapshot.aggregate(
         [
     { $sort : { timeStamp: -1 } },
     { $limit: 1},

     {
       $group:
         {
            _id: "New EEG Data",
            delta: { $avg: "$delta" },
            theta: { $avg: "$theta" },
            loAlpha: { $avg: "$loAlpha" },
            hiAlpha: { $avg: "$hiAlpha" },
            hiBeta: { $avg: "$hiBeta"},
            loBeta: { $avg: "$loBeta" },
            loGamma: { $avg: "$loGamma" },
            midGamma: { $avg: "$midGamma" }
         }
     }
   ], function(err, eegData){
    newData = eegData[0];
   // console.dir(newData);
   }

 );
    return newData;
}


function avgLastTen(){
    eegSnapshot.aggregate(
   [
     { $sort : { timeStamp: -1 } },
     { $limit: 10 },

     {
       $group:
         {
            _id: "Average 10 EEG Data",
            avgDelta: { $avg: "$delta" },
            avgTheta: { $avg: "$theta" },
            avgLoAlpha: { $avg: "$loAlpha" },
            avgHiAlpha: { $avg: "$hiAlpha" },
            avgLoBeta: { $avg: "$loBeta" },
            avgHiBeta: { $avg: "$hiBeta"},
            avgLoGamma: { $avg: "$loGamma" },
            avgMidGamma: { $avg: "$midGamma" }
         }
     }
   ], function(err, eegData){
    avgData = eegData[0];
   // console.dir(avgData);
   }
);
    return avgData;
}

function avgLast1000(){
    eegSnapshot.aggregate(
   [
     { $sort : { timeStamp: -1 } },
     { $limit: 1000 },

     {
       $group:
         {

            _id: "Average 1000 EEG Data",
            avgDelta: { $avg: "$delta" },
            avgTheta: { $avg: "$theta" },
            avgLoAlpha: { $avg: "$loAlpha" },
            avgHiAlpha: { $avg: "$hiAlpha" },
            avgLoBeta: { $avg: "$loBeta" },
            avgHiBeta: { $avg: "$hiBeta"},            
            avgLoGamma: { $avg: "$loGamma" },
            avgMidGamma: { $avg: "$midGamma" }
         }
     }
   ], function(err, eegData){
    avg1000Data = eegData[0];
   // console.dir(avgData);
   }
);
    return avg1000Data;
}


function findAll(){
    eegSnapshot.find({}, function(err, eegData){
    console.log('eegData' + eegData + '\n');
    });
}
function sendData(newData,avg10,avg1000){
    var brainDataChunk = [newData,avg10,avg1000];
    console.log(brainDataChunk);
    io.sockets.emit('brain-data', brainDataChunk);
}
