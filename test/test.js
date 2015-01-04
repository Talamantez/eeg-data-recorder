var assert = require('chai').assert;
var eeg = require('../eegFunctions');


suite("eeg", function(){

	test("lastShot should return an array", function(){
		console.log('hi');
		eeg.lastShot(function(data,callback){
			newData = data;
			console.log('newData: ' + newData);
			callback(testit);
		});
		var testit = function(){
			return assert.typeOf(newData 
			,'array'
			, 'eeg.lastShot() returns an array'
			)};
	});	
});