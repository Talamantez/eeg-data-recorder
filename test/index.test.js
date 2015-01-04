var request = require('supertest');
var express = require('express');
var app = require('../app');

console.dir(app)
/*describe('Index Page', function(){
	it("renders successfully", function(done){
		request(app).get('/').expect(200, done);
	});
});


function mockData(){
     return Math.round(Math.random()*100000);
}*/

describe('Mock Data', function(){
	it("generates a random number times 100000", function(){
		request(app).mockData().expect(Math.random()*100000,done);
	});
});