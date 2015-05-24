'use strict'

var express = require('express');
var app = express();
var http = require('http').Server(app);
var cylon = require('cylon');
var mongoose = require('mongoose');
var io = require('socket.io')(http);
var eeg = require('./eegFunctions');

//var port = process.env.PORT || 3000 ;
var port = 3000;

app.use(express.static(__dirname + '/dist'));

var headsetPort = '/dev/rfcomm0'; //this might be rfcomm0, rfcomm1, or rfcomm2. Check your connection.
var activeDB = 'eegControl'; /*use 'eeg'  for general testing', 
                        'eegNap'   for napping,
                        'eegSleep' for sleeping,
                        'eegAwake' for wake recording
                        Be sure this matches db in models/eegSnapshot
                        and to switch mongo  to this db,
                        'eegControl' for control data                          
                        and 'eegMock' for mock data
                        */ 

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/' + activeDB;

var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function callback(){
        console.log('db '+ activeDB + ' ready');
});

http.listen(port, function(){
    console.log('\nListening on port:' + port + '\n');
});

/*

Log out a message when a user connects to the website

*/

io.on('connection', function(socket){
    console.log('a user connected');
});

/*

Connect to MongoDB

*/

mongoose.connect(uristring);
/*

    Initialize the Cylon robot,
    save the new data to mongodb,
    grab data from MongoDB and emit it to website

*/

cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: headsetPort },
  device: { name: 'headset', driver: 'neurosky' }
})
.on('ready', function(robot) {
  var newData;
  var avg10Data;
  var avg1000Data;
  var delta_midgamma_ratio;
  robot.headset.on('eeg', function(data) {
    delta_midgamma_ratio = data.delta/data.midGamma;
    console.log('<<<<  '    +  delta_midgamma_ratio +       '       >>>>>');
    eeg.addShot(	data.delta,
        			data.theta,
        			data.loAlpha,
        			data.hiAlpha,
        			data.loBeta,
                    data.hiBeta,
        			data.loGamma,
        			data.midGamma,
                    delta_midgamma_ratio
    		),

    eeg.lastShot(function(data){
        newData = data;
    }),

    eeg.avgLastTen(function(data){
        avg10Data = data;
    }),
    
    eeg.avgLast1000(function(data){
        avg1000Data = data;
    }),

    sendData( newData, avg10Data, avg1000Data );

})})
.start();

/*

Uncomment the line below to output mock brain data
once per second

*/

// setInterval(mockHeadset,1000);

/* 

Helper Functions

*/

// Send data to website using socket.io
function sendData( newData, avg10, avg1000){
    var brainDataChunk = [ newData, avg10, avg1000 ];
    console.log( brainDataChunk );
    io.sockets.emit( 'brain-data' , brainDataChunk );
}

// Send simulated brain data using socket.io
function mockHeadset(){
    var mockNew = eeg.mockBrainData();
    var mock10Avg = eeg.mockBrainData();
    var mock1000Avg = eeg.mockBrainData();

    console.log('mockNew' + mockNew);
    console.log('mock10Avg' + mock10Avg);
    console.log('mock1000Avg' + mock1000Avg);

    sendData( mockNew, mock10Avg, mock1000Avg );
}
