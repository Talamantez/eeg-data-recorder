var eegSnapshot = require('./models/eegSnapshot');

module.exports = {
     addShot: function(delta, theta, loAlpha, hiAlpha, loBeta, hiBeta,loGamma, midGamma){
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
        newShot.save(function (err) {
            if (err){
                throw new Error('Shot did not save to database');
            } else {
                console.log ('Save successful');
            }
        });
    },
    mockData: function(){
        return Math.round(Math.random()*100000);
    },
    mockBrainData: function(){
        var fakeBrainData = {
                _id: "Data",
                delta: this.mockData(),
                theta: this.mockData(),
                loAlpha: this.mockData(),
                hiAlpha: this.mockData(),
                hiBeta: this.mockData(),
                loBeta: this.mockData(),
                loGamma: this.mockData(),
                midGamma: this.mockData()
             };
            console.log(fakeBrainData);

            return fakeBrainData;
    },
    findAll: function(){
        eegSnapshot.find({}, function(err, eegData){
            console.log('eegData' + eegData + '\n');
         });        
    },
    lastShot: function(callback){
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
    },
    avgLastTen: function(callback){
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
                    return callback(eegData);
               }
            );
    },

    avgLast1000: function(callback){
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
                return callback(eegData);
               }
            );
        }
}