/*
 * @description - Vector module.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * Vector module.
 * @return {Function}
 */
var Vector = (function() {
	'use strict';
	
	 /*
	  * Vector constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	  * @return {Undefined}
	  */
	function Vector(options) {
		//Submodule for vector math.
		var math = Vector.Math;
		
		//Reference to the current object.
		var that = this;
		
		//The vector's x and y coordinates.
		var x = options.x || 0;
		var y = options.y || 0;
		
		//2D drawing context.
		var ctx = options.ctx || null;
		
		/*
		 * Returns the length of the vector.
		 * @return {Number}
		 */
		this.length = function() {
			return Math.sqrt((x * x) + (y * y));
		};
		
		/*
		 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
		 * @return {Number}
		 */
		this.lengthSquared = function() {
			return ((x * x) + (y * y));
		};
		
		/*
		 * Adds a value to the vector.
		 * @param {Vector|Number|Object} vector - The vector or number we will add to our vector.
		 * @return {Vector}
		 */
		this.add = function(vector) {
			return _operation(math.add, vector);
		};
		
		/*
		 * Subtracts a value from the vector.
		 * @param {Vector|Number|Object} vector - The vector or number we will subtract from our vector.
		 * @return {Vector}
		 */
		this.subtract = function(vector) {
			return _operation(math.subtract, vector);
		};
		
		/*
		 * Multiplies the vector by a value.
		 * @param {Vector|Number|Object} vector - The vector or number we will multiply our vector by.
		 * @return {Vector}
		 */
		this.multiply = function(vector) {
			return _operation(math.multiply, vector);
		};
		
		/*
		 * Divides the vector by a value.
		 * @param {Vector|Number|Object} vector - The vector or number we will divide our vector by.
		 * @return {Vector}
		 */
		this.divide = function(vector) {
			return _operation(math.divide, vector);
		};
		
		/*
		 * Sets the vector's position.
		 * @param {Vector|Number|Object} vector - The new position.
		 * @return {Vector}
		 */
		this.setPosition = this.setVector = function(vector) {
			//If this is a Vector.
			if (vector && vector.getPosition) {
				x = vector.getPosition().x;
				y = vector.getPosition().y;
			}
			
			//If we received a number.
			else if (typeof vector === 'number') {
				x = vector;
				y = vector;
			}
			
			//Otherwise if this is an object
			else {
				x = (vector.x !== undefined) ? vector.x : x;
				y = (vector.y !== undefined) ? vector.y : y;
			}
			
			return this;
		};
		
		/*
		 * Returns the vector's x and y coordinates.
		 * @return {Object}
		 */
		this.getPosition = this.getVector = function() {
			return {x: x, y: y};
		};
		
		/*
		 * Set the 2d drawing context.
		 * @param {CanvasRenderingContext2D} _ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		this.setContext = function(_ctx) {
			ctx = _ctx;
		};
		
		/*
		 * Get the vector's 2d drawing context.
		 * @return {CanvasRenderingContext2D}
		 */
		this.getContext = function() {
			return ctx;
		};
		
		/*
		 * Performs arithmetic operations on vectors.
		 * @param {Function} method - The arithmetic function to be performed.
		 * @param {Vector|Number|Object} vector - The vector, number, or object we will be applying to our vector.
		 * @return {Vector}
		 */
		function _operation(method, vector) {
			// Get the current position.
			var position = that.getPosition();
			
			//The destination vector.
			var destination = null;
			
			//If we received a vector.
			if (vector && vector.getPosition)
				destination = method(position, vector.getPosition());
			
			//If we received a number.
			else if (typeof vector === 'number')
				destination = method(position, {x: vector, y: vector});
			
			//If we received an object.
			else
				destination = method(position, vector);
			
			//Set the new position.
			that.setPosition(destination);
			
			return that;
		};
	};
	
	return Vector;
}());