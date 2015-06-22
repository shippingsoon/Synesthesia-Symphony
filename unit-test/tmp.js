/*
 * @desription - Server unit test.
 * @copyright - 2015 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/
 * @version - v0.01
 * @license - GPLv3
 */


var assert = require('assert');

//Load 3rd party modules.
var should = require('should');
var restify = require('restify');
var Sequelize = require('sequelize');


//Array unit test.
describe('Array', function() {
	//Array indexOf test.
	describe('.indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(2, [1, 2, 5].indexOf(5));
			[1, 2, 3, 5].indexOf(5).should.equal(3);
		});
		
	});
	
	//Array length test.
	describe('.length', function() {
		it('Should be equal to array length', function() {
			[1, 2, 3, 4, 5].length.should.equal(5);
		});
	});
	
	
});

