'use strict'

var express = require('express');
var app = express();
var http = require('http').Server(app);
var cylon = require('cylon');
var mongoose = require('mongoose');
var db = mongoose.connection;
var io = require('socket.io')(http);
var eeg = require('./eegFunctions');

var port = process.env.PORT || 3000 ;

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

var newData;
var avgData;
var avg1000Data;

http.listen(port, function(){
    console.log('\nListening on port:' + port + '\n');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

mongoose.connect(uristring);
db.on('error', console.error);
db.once('open',function callback(){
	console.log('db '+ activeDB + ' ready');
});

cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: headsetPort },
  device: { name: 'headset', driver: 'neurosky' }
})
.on('ready', function(robot) {
  robot.headset.on('eeg', function(data) {
    eeg.addShot(	data.delta,
        			data.theta,
        			data.loAlpha,
        			data.hiAlpha,
        			data.loBeta,
                    data.hiBeta,
        			data.loGamma,
        			data.midGamma
    		),
    eeg.lastShot(function(data){
        newData = data;
    }),
    eeg.avgLastTen(function(data){
        avgData = data;
    }),
    eeg.avgLast1000(function(data){
        avg1000Data = data;
    }),
    sendData(newData,avgData,avg1000Data);

})})
.start();

function sendData(newData,avg10,avg1000){
    var brainDataChunk = [newData,avg10,avg1000];
    console.log(brainDataChunk);
    io.sockets.emit('brain-data', brainDataChunk);
}

function mockHeadset(){
    var mockNew = eeg.mockBrainData();
    var mock10Avg = eeg.mockBrainData();
    var mock1000Avg = eeg.mockBrainData();

    console.log('mockNew' + mockNew);
    console.log('mock10Avg' + mock10Avg);
    console.log('mock1000Avg' + mock1000Avg);

    sendData(mockNew,mock10Avg,mock1000Avg);
};