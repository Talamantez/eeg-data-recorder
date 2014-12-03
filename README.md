eeg-data-recorder
=================

Record your EEG data using Cylon.js and Mongoose. It works with Neurosky Mindwave Mobile and Ubuntu. 

This program is dependent on Gort (http://gort.io/), mongoDB (http://docs.mongodb.org/manual/installation/), Node Version Manager (https://github.com/creationix/nvm), so install those first.  

Open up a terminal, and use 3 windows:

In Window 1) 
Connect the Mindwave:

Get your Mindwave MAC number:
```
gort scan bluetooth
```
Pair the device:
```
gort bluetooth pair [device Mac number] hci0
```
In Window 2)
Run MongoDB:
```
mongod
```
In Window 3)

Use NVM Node Version 0.10.33:
If you don't have it yet, run:
```
nvm install 0.10.33
```
Use Node version 0.10.33
```
nvm use 0.10.33
```
Install dependencies:
```
npm install
```
Run the app:
```
node app.js
```

To see your brain data updating in realtime, open your browser to http://localhost:3000.

== Database Configuration
If you want to have multiple databases for testing, for instance, one for collecting sleep data, one for waking data, etc, make the following adjustments:

1) In your shell, make sure mongod is running, then open a new terminal and type:
```
use myDatabase
```
2) On line 13 of app.js, update the active database variable to match the db above:
```
var activeDB = 'myDatabase'
```
3) On line 14 of models/eegSnapshot.js, update the active database variable to match the db above:
```
collection: 'myDatabase'  
```

== Headset port debugging
If the connection to the headset drops, it may move up one number on your computer's rfcomm list, if so, reconnect the headset, then check which rfcomm port is being used, then update line 12 in app.js to match:

var headsetPort = '/dev/rfcomm0';

TO DO:

Implement charts

Signal Analysis:
- noise filtering
- band pass/high pass/low pass

Python initialization script

rgb(244,40,10)
rgb(238,130,12)
rgb(233,215,13)
rgb(161,228,15)
rgb(76,223,16)
rgb(17,218,37)
rgb(18,212,115)
rgb(19,207,187)