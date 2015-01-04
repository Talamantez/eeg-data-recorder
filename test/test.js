var assert = require('chai').assert;
var eeg = require('../eegFunctions');
var mongoose = require('mongoose');
var db = mongoose.connection;
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

mongoose.connect(uristring);
		    db.on('error', console.error);
		    db.once('open',function callback(){
		    	console.log('db '+ activeDB + ' ready');
		});	

suite("eeg", function(){

	test("lastShot should return an array", function(){
		
		eeg.lastShot(function(data){
			newData = data;
			console.log('newData: ' + newData);
		});

		return assert.typeOf(newData 
			,'array'
			, 'eeg.lastShot() returns an array');
	});	
});

