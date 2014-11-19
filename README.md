eeg-data-recorder
=================

Record your EEG data using Cylon.js and Mongoose. Works with Neurosky Mindwave Mobile and Ubuntu. 

I have modified it to record to a mongoDB database.


TO DO:

set up a filter 
===============
get the most recent 10 readings:
```
db.eeg.find().sort({ $natural: -1 }).limit(10)
```
average the readings:
```
db.eeg.aggregate(
   [
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
   ]
)
```
