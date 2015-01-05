    lastShot(function(data){
        newData = data;
    })

function lastShot(callback){
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
                    return callback(eegData);
             }
        );

               
    }    

    function lastShot (callback) { 
    	return callback ('pony'); 
    }; 

    lastShot (function(data){
    	var newData = data;
    	return newData
    });

    lastShot(function(data){
    	return expect(data).to.be.an('object');
    });


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eegControl');




//////////////////////////////////////////////////////////////////////

var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function callback(){console.log('db ready');});
mongoose.connect('mongodb://locahost/eegControl');
var eeg = require('eegFunctions');

eeg.lastShot(function(data){console.log(data);});
