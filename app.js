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
  connection: { name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm1' },
  device: { name: 'headset', driver: 'neurosky' }
})
.on('ready', function(robot) {
  robot.headset.on('eeg', function(data) {
    addShot(	data.delta,
    			data.theta,
    			data.loAlpha,
    			data.hiAlpha,
    			data.loBeta,
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
	    		delta: delta,
	    		theta: theta,
	    		loAlpha: loAlpha,
	    		hiAlpha: hiAlpha,
	    		loBeta: loBeta,
	    		loGamma: loGamma,
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
            _id: "Average EEG Data",
            avgDelta: { $avg: "$delta" },
            avgTheta: { $avg: "$theta" },
            avgLoAlpha: { $avg: "$loAlpha" },
            avgHiAlpha: { $avg: "$hiAlpha" },
            avgLoBeta: { $avg: "$loBeta" },
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
            _id: "Average EEG Data",
            avgDelta: { $avg: "$delta" },
            avgTheta: { $avg: "$theta" },
            avgLoAlpha: { $avg: "$loAlpha" },
            avgHiAlpha: { $avg: "$hiAlpha" },
            avgLoBeta: { $avg: "$loBeta" },
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

function sendData(a,b,c){
    var brainDataChunk = [a,b,c];
    console.log(brainDataChunk);
    io.sockets.emit('brain-data', brainDataChunk);
}

/*server.get('/usersList', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
});*/

/*app.get('/', function(req,res){
    res.send('<!doctype html>'+
            '<html>'+
            '<title>'+
            'Neurosky - Cylon - Brian Data'+
            '</title>'+
            '<head>'+
            '<style>'+
            '.page-header{diplay:block;margin:0 auto 0 50px;color:#349948;width:100%;}'+
            '.brain-data-container{margin:0 0 0 50px;display:inline-block;}'+
            '.brain-data-heading{color:#266299;}'+
            '.brain-data-row{ display:block;color:#123456;width:200px; padding:0 0 10px 0; border:0 0 1px 0; }'+
            '.brain-data-category{ width: 100px; display:inline-block;}'+
            '.brain-data-value{ color:#ff0000; display:inline-block;}'+ 
            '</style>'+
            '</head>'+
            '<body>'+
        '<div class="page-header"><h1>Brain Data</h1></div>'+
        
        '<div class="brain-data-container">'+
        '<h3 class="brain-data-heading">New Reading</h3>' +
        '<div class="brain-data-row">'+
            '<div class="brain-data-category">Delta: </div>' + 
            '<div class="brain-data-value">' + newData["delta"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+
            '<div class="brain-data-category">Theta: </div>' + f
            '<div class="brain-data-value">' + newData["theta"] + '</div>' +
        '</div>' + 
        '<div class="brain-data-row">'+   
            '<div class="brain-data-category">Low Alpha: </div>' + 
            '<div class="brain-data-value">' + newData["loAlpha"] + '</div>' +
        '</div>' +     
        '<div class="brain-data-row">'+
            '<div class="brain-data-category">High Alpha: </div>' + 
            '<div class="brain-data-value">' + newData["hiAlpha"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+    
            '<div class="brain-data-category">Low Beta: </div>' + 
            '<div class="brain-data-value">' + newData["loBeta"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+    
            '<div class="brain-data-category">Low Gamma: </div>' + 
            '<div class="brain-data-value">' + newData["loGamma"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+    
            '<div class="brain-data-category">Mid Gamma: </div>' + 
            '<div class="brain-data-value">' + newData["midGamma"] + '</div>' +
        '</div>' +
        '</div>' +

        '<div class="brain-data-container">'+
        '<h3 class="brain-data-heading">Average of Last 10 Readings</h3>' +
        '<div class="brain-data-row">'+
            '<div class="brain-data-category">Delta: </div>' + 
            '<div class="brain-data-value">' + avgData["avgDelta"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+
            '<div class="brain-data-category">Theta: </div>' + 
            '<div class="brain-data-value">' + avgData["avgTheta"] + '</div>' +
        '</div>' + 
        '<div class="brain-data-row">'+   
            '<div class="brain-data-category">Low Alpha: </div>' + 
            '<div class="brain-data-value">' + avgData["avgLoAlpha"] + '</div>' +
        '</div>' +     
        '<div class="brain-data-row">'+
            '<div class="brain-data-category">High Alpha: </div>' + 
            '<div class="brain-data-value">' + avgData["avgHiAlpha"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+    
            '<div class="brain-data-category">Low Beta: </div>' + 
            '<div class="brain-data-value">' + avgData["avgLoBeta"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+    
            '<div class="brain-data-category">Low Gamma: </div>' + 
            '<div class="brain-data-value">' + avgData["avgLoGamma"] + '</div>' +
        '</div>' +
        '<div class="brain-data-row">'+    
            '<div class="brain-data-category">Mid Gamma: </div>' + 
            '<div class="brain-data-value">' + avgData["avgMidGamma"] + '</div>' +
        '</div>' +
        '</div>' +
        '</body>'+
        '<html>'

        );   
    });
*/
