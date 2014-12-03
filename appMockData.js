'use strict'

var express = require('express');
var app = express();
var http = require('http').Server(app);
var cylon = require('cylon');
var mongoose = require('mongoose');
var eegSnapshot = require('./models/eegSnapshot.js');
var db = mongoose.connection;
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;

var headsetPort = '/dev/rfcomm0'; //this might be rfcomm0, rfcomm1, or rfcomm2. Check your connection.
var activeDB = 'eegMock'; /*use 'eeg'  for general testing', 
                        'eegNap'   for napping,
                        'eegSleep' for sleeping,
                        'eegAwake' for wake recording,
                        'eegMock'  for mock data
                        Be sure this matches db in models/eegSnapshot
                        and to switch mongo  to this db,
                        'eegControl' for control data                          
                        */ 

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/' + activeDB;
var newData;
var avgData;
var avg1000Data;

//app.listen(process.env.PORT || port);
http.listen(port, function(){
    console.log('\nListening on port:' + port + '\n');
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
    //res.sendFile(__dirname + '/public/style.css');
});

io.on('connection', function(socket){
    console.log('a user connected');
});

// mongoose.connect('mongodb://localhost/eeg');
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
    addShot(	data.delta,
    			data.theta,
    			data.loAlpha,
    			data.hiAlpha,
    			data.loBeta,
                data.hiBeta,
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

function addShot(delta, theta, loAlpha, hiAlpha, loBeta, hiBeta,loGamma, midGamma){
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
            timeStamp:          { $first: "$timeStamp" },
            delta:              { $avg:   "$delta"     },
            theta:              { $avg:   "$theta"     },
            loAlpha:            { $avg:   "$loAlpha"   },
            hiAlpha:            { $avg:   "$hiAlpha"   },
            hiBeta:             { $avg:   "$hiBeta"    },
            loBeta:             { $avg:   "$loBeta"    },
            loGamma:            { $avg:   "$loGamma"   },
            midGamma:           { $avg:   "$midGamma"  }
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
            _id: "Avg Last 10 EEG Data",
            timeWindowStart:    { $last:  "$timeStamp" },
            timeWindowEnd:      { $first: "$timeStamp" },
            delta:              { $avg:   "$delta"     },
            theta:              { $avg:   "$theta"     },
            loAlpha:            { $avg:   "$loAlpha"   },
            hiAlpha:            { $avg:   "$hiAlpha"   },
            hiBeta:             { $avg:   "$hiBeta"    },
            loBeta:             { $avg:   "$loBeta"    },
            loGamma:            { $avg:   "$loGamma"   },
            midGamma:           { $avg:   "$midGamma"  }
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
            _id: "Avg Last 1000 EEG Data",
            timeWindowStart:    { $last:  "$timeStamp"  },
            timeWindowEnd:      { $first: "$timeStamp"  },            
            delta:              { $avg:   "$delta"      },
            theta:              { $avg:   "$theta"      },
            loAlpha:            { $avg:   "$loAlpha"    },
            hiAlpha:            { $avg:   "$hiAlpha"    },
            hiBeta:             { $avg:   "$hiBeta"     },
            loBeta:             { $avg:   "$loBeta"     },
            loGamma:            { $avg:   "$loGamma"    },
            midGamma:           { $avg:   "$midGamma"   }
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

function mockData(){
     return Math.round(Math.random()*100000);
}

function mockBrainData(){
    // Make an object 

    var fakeBrainData = {
            _id: "Data",
            delta: mockData(),
            theta: mockData(),
            loAlpha: mockData(),
            hiAlpha: mockData(),
            hiBeta: mockData(),
            loBeta: mockData(),
            loGamma: mockData(),
            midGamma: mockData()
         }
    return fakeBrainData;
};

function mockHeadset(){
    var mockNew = mockBrainData();
    var mock10Avg = mockBrainData();
    var mock1000Avg = mockBrainData();

    console.log('mockNew' + mockNew);
    console.log('mock10Avg' + mock10Avg);
    console.log('mock1000Avg' + mock1000Avg);

    sendData(mockNew,mock10Avg,mock1000Avg);
}

// Enable below function to mock brain data
setInterval(mockHeadset,1000);