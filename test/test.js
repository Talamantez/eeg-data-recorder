var assert = require('chai').assert;
var expect = require('chai').expect;
var eeg = require('../eegFunctions');
var chai = require("chai");
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function callback(){console.log('db ready');});
mongoose.connect('mongodb://localhost/eegControl');


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

	test("mockBrainData() 'loGamma+' field should be a number", function(){
			expect(eeg.mockBrainData()['loGamma']).to.be.a('number');
	});

	test("mockBrainData() 'midGamma' field should be a number", function(){
			expect(eeg.mockBrainData()['midGamma']).to.be.a('number');
	});

});	


suite("eeg_db_Functions", function(){
/*
	test("addShot() should not throw an error if it accepts 8 numbers as input", function(done){
		expect(eeg.mockBrainData).to.not.throw(Error);
		done();
	});*/
	// expect(goodFn).to.not.throw(Error);
	test("findAll() should be an object");

	test("lastShot() should be an object", function(done){
		eeg.lastShot(function(eegData){
			expect(eegData).to.be.an('object');
			done();
		});

	});

	test("lastShot() should have 9 keys", function(done){
		eeg.lastShot(function(eegData){		
			expect(Object.keys(eegData).length).to.equal(10);
			done();
		})
	})

	test("lastShot() should have these keys", function(done){
		eeg.lastShot(function(eegData){
			console.log('eegData: ');
			console.dir(eegData);
			expect(eegData).to.have.keys(['_id',
											'timeStamp',
											'delta',
											'theta',
											'loAlpha',
											'hiAlpha',
											'loBeta',
											'hiBeta',
											'loGamma',
											'midGamma'
												]);
			done();
		});
			
	});

	test("lastShot() '_id' field should be the string 'New EEG Data' ", function(done){
			eeg.lastShot(function(eegData){		
			expect(eegData['_id']).to.equal('New EEG Data');
			done();
		})
	});


	test("avgLastTen() should be an object", function(done){
		eeg.avgLastTen(function(eegData){
			expect(eegData).to.be.an('object');
			done();
		});
	});
	test("avgLastTen() should have 9 keys", function(done){
		eeg.avgLastTen(function(eegData){		
			expect(Object.keys(eegData).length).to.equal(11);
			done();
		})
	})

	test("avgLastTen() should have these keys", function(done){
		eeg.avgLastTen(function(eegData){
			console.log('eegData: ');
			console.dir(eegData);
			expect(eegData).to.have.keys([  '_id',
											'timeWindowStart',
											'timeWindowEnd',
											'delta',
											'theta',
											'loAlpha',
											'hiAlpha',
											'loBeta',
											'hiBeta',
											'loGamma',
											'midGamma'
												]);
			done();
		});
			
	});

	test("avgLastTen() '_id' field should be the string 'Avg Last 10 EEG Data' ", function(done){
			eeg.avgLastTen(function(eegData){		
			expect(eegData['_id']).to.equal('Avg Last 10 EEG Data');
			done();
		})
	});

	test("avgLast1000() should be an object", function(done){
		eeg.avgLast1000(function(eegData){
			expect(eegData).to.be.an('object');
			done();
		})
	});

});	
	test("avgLast1000() should have 9 keys", function(done){
		eeg.avgLast1000(function(eegData){		
			expect(Object.keys(eegData).length).to.equal(11);
			done();
		})
	})

	test("avgLast1000() should have these keys", function(done){
		eeg.avgLast1000(function(eegData){
			console.log('eegData: ');
			console.dir(eegData);
			expect(eegData).to.have.keys([  '_id',
											'timeWindowStart',
											'timeWindowEnd',
											'delta',
											'theta',
											'loAlpha',
											'hiAlpha',
											'loBeta',
											'hiBeta',
											'loGamma',
											'midGamma'
												]);
			done();
		});
			
	});
	test("avgLast1000() '_id' field should be the string 'Avg Last 1000 EEG Data' ", function(done){
			eeg.avgLast1000(function(eegData){		
			expect(eegData['_id']).to.equal('Avg Last 1000 EEG Data');
			done();
		})
	});
