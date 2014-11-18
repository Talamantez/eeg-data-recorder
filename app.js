var Express = require('express');
var Cylon = require('cylon');
var mongoose = require('mongoose');
var eegSnapshot = require('./models/eegSnapshot.js');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/eeg');

db.on('error', console.error);
db.once('open',function callback(){
	console.log('db eeg ready');
});


Cylon.robot({
  connection: { name: 'neurosky', adaptor: 'neurosky', port: '/dev/rfcomm0' },

  device: { name: 'headset', driver: 'neurosky' }
})
.on('ready', function(robot) {
  robot.headset.on('eeg', function(data) {
    console.log(
    	'delta: ' + data.delta + '\n',
    	'theta: ' + data.theta + '\n',
    	'loAlpha: ' + data.loAlpha + '\n',
    	'hiAlpha: ' + data.hiAlpha + '\n',
    	'loBeta: ' + data.loBeta + '\n',
    	'loGamma: ' + data.loGamma + '\n',
    	'midGamma: ' + data.midGamma + '\n'),
    addShot(	data.delta,
    			data.theta,
    			data.loAlpha,
    			data.hiAlpha,
    			data.loBeta,
    			data.loGamma,
    			data.midGamma
    		)
})})
.start();

/* Test for the addShot function

 setInterval(function(){ addShot(1,2,3,4,5,6,7); },1000);

*/

/*  Save a record to the database

*/

function addShot(delta, theta, loAlpha, hiAlpha, loBeta, loGamma, midGamma){
		   var newShot = new eegSnapshot({
	    		delta: delta,
	    		theta: theta,
	    		loAlpha: loAlpha,
	    		hiAlpha: hiAlpha,
	    		loBeta: loBeta,
	    		loGamma: loGamma,
	    		midGamma: midGamma
    });
    console.log('saving shot to eeg database: ' + newShot);
    newShot.save(function (err) {if (err) console.log ('Error on save!')});
}