var assert = require('chai').assert;
var expect = require('chai').expect;
var eeg = require('../eegFunctions');

suite("mockEegData", function(){

	/*

	Type test eeg.mockData()

	*/

	test("mockData() should be a number", function(){
	  	    expect(eeg.mockData()).to.be.a('number');
	});

	test("mockData() should not be a string", function(){
			expect(eeg.mockData()).to.not.be.a('string');
	});

	test("mockData() should not be an array", function(){
			expect(eeg.mockData()).to.not.be.an('array');
	});
	
	test("mockData() should not be an object", function(){
			expect(eeg.mockData()).to.not.be.an('object');
	});	

	/*

	Type test eeg.mockBrainData()

	*/

	test("mockBrainData() should be an object", function(){
			expect(eeg.mockBrainData()).to.be.an('object');
	});

	test("mockBrainData() should not be an array", function(){
			expect(eeg.mockBrainData()).to.not.be.an('array');
	});

	test("mockBrainData() should not be a string", function(){
			expect(eeg.mockBrainData()).to.not.be.a('string');
	});

	/*

	Content test eeg.mockBrainData()

	*/

	test("mockBrainData() should have 9 keys", function(){
			expect(Object.keys(eeg.mockBrainData()).length).to.equal(9);
	});

	test("mockBrainData() should have these keys: _id, delta, theta, loAlpha, hiAlpha, hiBeta, loBeta, loGamma, midGamma ", function(){
			expect(eeg.mockBrainData()).to.have.keys(['_id',
													  'delta',
													  'theta',
													  'loAlpha',
													  'hiAlpha',
													  'loBeta',
													  'hiBeta',													  
													  'loGamma',
													  'midGamma']);
	});

	test("mockBrainData() '_id' field should be the string 'Data' ", function(){
			expect(eeg.mockBrainData()['_id']).to.equal('Data');

	});

	test("mockBrainData() 'delta' field should be a number", function(){
			expect(eeg.mockBrainData()['delta']).to.be.a('number');
	});

	test("mockBrainData() 'theta' field should be a number", function(){
			expect(eeg.mockBrainData()['theta']).to.be.a('number');
	});

	test("mockBrainData() 'loAlpha' field should be a number", function(){
			expect(eeg.mockBrainData()['loAlpha']).to.be.a('number');
	});	

	test("mockBrainData() 'hiAlpha' field should be a number", function(){
			expect(eeg.mockBrainData()['hiAlpha']).to.be.a('number');
	});

	test("mockBrainData() 'loBeta' field should be a number", function(){
			expect(eeg.mockBrainData()['loBeta']).to.be.a('number');
	});		

	test("mockBrainData() 'hiBeta' field should be a number", function(){
			expect(eeg.mockBrainData()['hiBeta']).to.be.a('number');
	});

	test("mockBrainData() 'loGamma' field should be a number", function(){
			expect(eeg.mockBrainData()['loGamma']).to.be.a('number');
	});

	test("mockBrainData() 'midGamma' field should be a number", function(){
			expect(eeg.mockBrainData()['midGamma']).to.be.a('number');
	});

});	


suite("eeg_db_Functions", function(){


});

/*    mockData: function(){
        return Math.round(Math.random()*100000);
    },*/
/*
    eeg.lastShot(function(data){
        newData = data;
        console.log('newData from app: ')
        console.dir(newData );
    })


[ { _id: 'New EEG Data',
    timeStamp: Sun Jan 04 2015 14:40:15 GMT-0800 (PST),
    delta: 1574912,
    theta: 2097152,
    loAlpha: 4128768,
    hiAlpha: 12451840,
    hiBeta: 15990784,
    loBeta: 15401472,
    loGamma: 2752512,
    midGamma: 3735580 } ]

*/
