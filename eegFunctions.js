var eegSnapshot = require('./models/eegSnapshot');

module.exports = {

     addShot: function(delta, theta, loAlpha, hiAlpha, loBeta, hiBeta,loGamma, midGamma){
        var typeCheckObj = {
            delta:    delta,
            theta:    theta,
            loAlpha:  loAlpha,
            hiAlpha:  hiAlpha,
            loBeta:   loBeta,
            hiBeta:   hiBeta,
            loGamma:  loGamma,
            midGamma: midGamma
        }

        // If typecheck passes, save shot to database

        this.typecheckKeyValues(typeCheckObj, function(){
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
                loBeta: this.mockData(),
                hiBeta: this.mockData(),                
                loGamma: this.mockData(),
                midGamma: this.mockData()
             };
            console.log(fakeBrainData);
            return fakeBrainData;
    },

    findAll: function(callback){
        eegSnapshot.find({}, function(err, eegData){
/*            console.log('eegData' + eegData + '\n');*/
            return callback(eegData);
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
                        loBeta:             { $avg:   "$loBeta"    },
                        hiBeta:             { $avg:   "$hiBeta"    },                        
                        loGamma:            { $avg:   "$loGamma"   },
                        midGamma:           { $avg:   "$midGamma"  }
                     }
                 }
               ], function(err, eegData){
                    return callback(eegData[0]);
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
                        loBeta:             { $avg:   "$loBeta"    },
                        hiBeta:             { $avg:   "$hiBeta"    },
                        loGamma:            { $avg:   "$loGamma"   },
                        midGamma:           { $avg:   "$midGamma"  }
                     }
                 }
               ], function(err, eegData){
                    return callback(eegData[0]);
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
                        loBeta:             { $avg:   "$loBeta"     },
                        hiBeta:             { $avg:   "$hiBeta"     },
                        loGamma:            { $avg:   "$loGamma"    },
                        midGamma:           { $avg:   "$midGamma"   }
                     }
                 }
               ], function(err, eegData){
                return callback(eegData[0]);
               }
            );
        },

    // This function should build a ratio of delta to midgamma
    // any large, sudden changes are indicative of a change in 
    // creature consciousness from wake to sleep and vice versa

    delta_midgamma: function(callback){
        eegSnapshot.aggregate([
                { $sort : { timeStamp: -1 } },
                { $limit: 1000 }
            ]);
    },

    typecheckKeyValues: function(obj, callback){
        for (var prop in obj) {
            console.log(obj + " " + prop + " = " + obj[prop]);
            if( typeof obj[prop] != "number"){
                throw new Error(obj + " " + prop + " = " + obj[prop] + " is not a number.");
            }
        }
        if( callback ){
            callback();
        }
    }    
}
