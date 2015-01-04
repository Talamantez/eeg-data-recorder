var assert = require('chai').assert;
var eeg = require('../eegFunctions');

suite("eeg", function(){

	test("lastShot should return an array", function(){
			eeg.lastShot(function(data){
				return assert.typeOf(
					data
					,'array'
					, 'eeg.lastShot() returns an array'
				);
			});
	});
});	