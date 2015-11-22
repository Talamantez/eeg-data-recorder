'use strict'

var express     = require( 'express' ),
    app         = express(),
    http        = require( 'http' ).Server( app ),
    cylon       = require( 'cylon' ),
    mongoose    = require( 'mongoose' ),
    io          = require( 'socket.io' )( http ),
    eeg         = require( './eegFunctions' );

var port = process.env.PORT || 3001 ;

var db = mongoose.connection;

var headsetPort = '/dev/rfcomm0'; 
                        /* 
                            this might be rfcomm0,
                            rfcomm1,
                            or rfcomm2.
                            Check your connection.
                        */

var activeDB    = 'eegControl'; 
                        /*
                            use 'eeg'  for general testing', 
                            'eegNap'   for napping,
                            'eegSleep' for sleeping,
                            'eegAwake' for wake recording
                            Be sure this matches db in models/eegSnapshot
                            and to switch mongo  to this db,
                            'eegControl' for control data                          
                            and 'eegMock' for mock data
                        */ 

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/' + activeDB;

app.use( express.static( __dirname + '/dist' ) );

db.on( 'error' , console.error );
db.once( 'open', function callback(){
        console.log( 'db ' + activeDB + ' ready' );
});

http.listen( port, function(){
    console.log( '\nListening on port:' + port + '\n' );
});

/*

Log out a message when a user connects to the website

*/

io.on( 'connection' , function(socket){
    console.log('a user connected');
});

/*

Connect to MongoDB

*/

mongoose.connect( uristring );

/*

    Initialize the Cylon robot,
    save the new data to mongodb,
    grab data from MongoDB and emit it to website

*/
/*setInterval(function() {
    console.log('mocking headset');
    mockHeadset();
}, 0);*/

cylon.robot({
      connection:   { name: 'neurosky', adaptor: 'neurosky', port: headsetPort },
      device:       { name: 'headset', driver: 'neurosky' }
})
.on( 'ready' , function(robot) {
    var newData = {};
    var avg10Data = {};
    var avg1000Data = {};
    var pauseRecord = true;
    robot.headset.on('signal', function( data ){
        console.log( data );
        if( data !== 0 ){
            pauseRecord = true;
        } else {
            pauseRecord = false
        }
    });
    robot.headset.on( 'eeg' , function(data) {
        if( !pauseRecord){
            eeg.addShot(    data.delta,
                            data.theta,
                            data.loAlpha,
                            data.hiAlpha,
                            data.loBeta,
                            data.hiBeta,
                            data.loGamma,
                            data.midGamma
                    ),
            eeg.lastShot(function(data){
                newData.values = data;
            }),
            eeg.avgLastTen(function(data){
                avg10Data.values = data;
            }),
            eeg.avgLast1000(function(data){
                avg1000Data.values = data;
            }),
            sendData(newData,avg10Data,avg1000Data);
        }    
    })
})
.start();

/* 

Helper Functions

*/

// Send data to website using socket.io
function sendData(newData,avg10,avg1000){
    newData.title = 'newData';
    newData.description = 'Data prints in at 1/s';
    avg10.title = 'avg10';
    avg10.description = 'average of the last 10 shots';
    avg1000.title = 'avg1000';
    avg1000.description = 'average of last 1000 shots';
    var brainDataChunk = [ newData, avg10, avg1000 ];
    // var brainDataChunk = [ newData ];
    console.log( brainDataChunk );
    io.sockets.emit( 'brain-data' , brainDataChunk );
}

// Send simulated brain data using socket.io
function mockHeadset(){
    var mockNew = {};
    var mock10Avg = {};
    var mock1000Avg = {};
    mockNew.values                 = eeg.mockBrainData();
    mock10Avg.values               = eeg.mockBrainData();
    mock1000Avg.values             = eeg.mockBrainData();

    console.log('mockNew'       + mockNew);
    console.log('mock10Avg'     + mock10Avg);
    console.log('mock1000Avg'   + mock1000Avg);

    sendData(mockNew,mock10Avg,mock1000Avg);
}