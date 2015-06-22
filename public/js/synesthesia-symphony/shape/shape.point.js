/*
 * @description - Point submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Shape = Shape || {};

/*
 * Point submodule.
 * @param {Shape} shape - Shape module.
 * @return {Function}
 */
Shape.Point = (function(shape) {
	'use strict';
	
	 /*
	  * Point constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {Number} options.delay - The delay in milliseconds.
	  * @param {Number} options.speed - The point's speed.
	  * @return {Undefined}
	  */
	function Point(options) {
		//Call our parent's constructor.
		shape.Circle.call(this, options);
		
		//Reference to the current object.
		var that = this;
		
		//The point's delay.
		var delay = options.delay || arguments[2] || 0;
		
		//The point's speed.
		var speed = options.speed || arguments[3] || 0;

		/*
		 * Sets the point's position.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.delay - The delay in milliseconds.
		 * @return {Undefined}
		 */
		this.setPoint = function(options) {
			that.setPosition(options);
			
			delay = options.delay || delay;
		};
		
		/*
		 * Returns the point's position.
		 * @return {Object}
		 */
		this.getPoint = function() {
			var position = that.getCircle();
			
			position.delay = delay;
			
			return position;
		};

		/*
		 * Set the point's delay.
		 * @param {Number} _delay - The new delay in milliseconds.
		 * @return {Undefined}
		 */
		this.setDelay = function(_delay) {
			if (_delay > 0)
				delay = _delay;
		};
		
		/*
		 * Get the point's delay.
		 * @return {Undefined}
		 */
		this.getDelay = function() {
			return delay;
		};
		
		/*
		 * Get the point's speed.
		 * @return {Number}
		 */
		this.getSpeed = function() {
			return speed;
		};
	};
	
	Point.prototype = Object.create(shape.Circle.prototype);
	
	return Point;
}(Shape));