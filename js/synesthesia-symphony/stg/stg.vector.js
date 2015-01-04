/*
	@description - Vector submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//Vector submodule.
STG.Vector = (function(stg) {
	"use strict";
	
	var math = stg.Math;
	
	 /*
	  * Vector constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  */
	function Vector(options) {
		//Reference to the current object.
		var that = this;
		
		//The vector's x and y coordinates.
		var x = options.x || arguments[0] || 0;
		var y = options.y || arguments[1] || 0;
		
		/*
		 * Returns the length of the vector.
		 */
		this.length = function() {
			return Math.sqrt((x * x) + (y * y));
		};
		
		/*
		 * Returns the length of the vector squared. This method can be used to cheaply find the nearest object.
		 */
		this.lengthSquared = function() {
			return ((x * x) + (y * y));
		};
		
		/*
		 * Adds a value to the vector.
		 * @param {STG.Vector|Number} vector - The vector or number we will add to our vector.
		 */
		this.add = function(vector) {
			return _operation(math.add, vector);
		};
		
		/*
		 * Subtracts a value from the vector.
		 * @param {STG.Vector|Number} vector - The vector or number we will subtract from our vector.
		 */
		this.subtract = function(vector) {
			return _operation(math.subtract, vector);
		};
		
		/*
		 * Multiplies the vector by a value.
		 * @param {STG.Vector|Number} vector - The vector or number we will multiply our vector by.
		 */
		this.multiply = function(vector) {
			return _operation(math.multiply, vector);
		};
		
		/*
		 * Divides the vector by a value.
		 * @param {STG.Vector|Number} vector - The vector or number we will divide our vector by.
		 */
		this.divide = function(vector) {
			return _operation(math.divide, vector);
		};
		
		/*
		 * Sets the vector's position.
		 * @param {STG.Vector|Object} vector - The new position.
		 */
		this.setPosition = function(vector) {
			//If this is a Vector.
			if (vector instanceof Vector) {
				x = vector.getPosition().x;
				y = vector.getPosition().y;
			}
			
			//Otherwise if this is an object
			else {
				x = (vector.x !== undefined) ? vector.x : x;
				y = (vector.y !== undefined) ? vector.y : y;
			}
			
			return this;
		};
		
		/*
		 * Returns the vector's position.
		 */
		this.getPosition = function() {
			return {x: x, y: y};
		};
		
		/*
		 * Follow.
		 * @param {STG.Vector} vector - TBA
		 */
		this.follow = function(vector) {
			
		};
		
		/*
		 * Normalized.
		 * @param {STG.Vector} vector - TBA
		 */
		this.normalized = function(vector) {
			//If our argument is a vector retrieve its position.
			/*
			if (vector.constructor === Vector)
				vector = vector.getPosition();
			
			var destination = math.sub(vector, this.getPosition());
			var target = new Vector(destination);
			
			return target.divide(target.length()).getPosition();
			*/
			
		};
		
		/*
		 * Performs arithmetic operations on vectors.
		 * @param {Function} method - The arithmetic function to be invoked.
		 * @param {STG.Vector|Number} vector - The vector or number we will be applying to our vector.
		 */
		function _operation(method, vector) {
			// Get the current position.
			var position = that.getPosition();
			
			//The destination vector.
			var destination = null;
			
			//If we received a vector.
			if (vector instanceof Vector)
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
}(STG));