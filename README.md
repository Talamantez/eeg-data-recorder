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

TO DO:

Implement charts