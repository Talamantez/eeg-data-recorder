var assert = require('chai').assert;
var expect = require('chai').expect;
var eeg = require('../eegFunctions');
var chai = require("chai");
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function callback(){console.log('db ready');});
mongoose.connect('mongodb://localhost/eegTest');


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

	test("addShot() should not throw an error 8 numbers are submitted as input", function(done){
		expect(function(){eeg.addShot(
								eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData(),
			                    eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData()
        			);}).to.not.throw(Error);
		done();
	});
	test("addShot() should throw an error if a string is submitted as input", function(done){
		expect(function(){eeg.addShot(
								'bananas',
			        			eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData(),
			                    eeg.mockData(),
			        			eeg.mockData(),
			        			eeg.mockData()
        			);}).to.throw(Error);
		done();
	});

	test("findAll() should be an object", function(done){
		eeg.findAll(function(eegData){
			expect(eegData).to.be.an('array');
		});
		done();
	});

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
	test("lastShot() 'delta' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['delta']).to.be.a('number');
			});
			done();
	});
	test("lastShot() 'theta' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['theta']).to.be.a('number');
			});
			done();
	});	
	test("lastShot() 'loAlpha' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['loAlpha']).to.be.a('number');
			});
			done();
	});
	test("lastShot() 'hiAlpha' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['hiAlpha']).to.be.a('number');
			});
			done();
	});
	test("lastShot() 'loBeta' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['loBeta']).to.be.a('number');
			});
			done();
	});	
	test("lastShot() 'hiBeta' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['hiBeta']).to.be.a('number');
			});
			done();
	});
	test("lastShot() 'loGamma' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['loGamma']).to.be.a('number');
			});
			done();
	});
	test("lastShot() 'midGamma' field should be a number", function(done){
			eeg.lastShot(function(eegData){
				expect(eegData['midGamma']).to.be.a('number');
			});
			done();
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
	test("avgLastTen() 'delta' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['delta']).to.be.a('number');
			});
			done();
	});
	test("avgLastTen() 'theta' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){	
				expect(eegData['theta']).to.be.a('number');
			});
			done();
	});	
	test("avgLastTen() 'loAlpha' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['loAlpha']).to.be.a('number');
			});
			done();
	});
	test("avgLastTen() 'hiAlpha' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['hiAlpha']).to.be.a('number');
			});
			done();
	});
	test("avgLastTen() 'loBeta' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['loBeta']).to.be.a('number');
			});
			done();
	});	
	test("avgLastTen() 'hiBeta' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['hiBeta']).to.be.a('number');
			});
			done();
	});
	test("avgLastTen() 'loGamma' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['loGamma']).to.be.a('number');
			});
			done();
	});
	test("avgLastTen() 'midGamma' field should be a number", function(done){
			eeg.avgLastTen(function(eegData){
				expect(eegData['midGamma']).to.be.a('number');
			});
			done();
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
	test("avgLast1000() 'delta' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['delta']).to.be.a('number');
			});
			done();
	});
	test("avgLast1000() 'theta' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['theta']).to.be.a('number');
			});
			done();
	});	
	test("avgLast1000() 'loAlpha' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['loAlpha']).to.be.a('number');
			});
			done();
	});
	test("avgLast1000() 'hiAlpha' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['hiAlpha']).to.be.a('number');
			});
			done();
	});
	test("avgLast1000() 'loBeta' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['loBeta']).to.be.a('number');
			});
			done();
	});	
	test("avgLast1000() 'hiBeta' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['hiBeta']).to.be.a('number');
			});
			done();
	});
	test("avgLast1000() 'loGamma' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['loGamma']).to.be.a('number');
			});
			done();
	});
	test("avgLast1000() 'midGamma' field should be a number", function(done){
			eeg.avgLast1000(function(eegData){
				expect(eegData['midGamma']).to.be.a('number');
			});
			done();
	});