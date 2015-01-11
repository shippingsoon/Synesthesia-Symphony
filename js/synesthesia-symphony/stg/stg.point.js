/*
	@description - Point submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//Point submodule.
STG.Point = (function(stg) {
	"use strict";
	
	 /*
	  * Point constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {Number} options.delay - The delay in milliseconds.
	  * @param {Number} options.speed - The point's speed.
	  */
	function Point(options) {
		//Call our parent's constructor.
		stg.Vector.call(this, options);
		
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
		 */
		this.setPoint = function(options) {
			this.setPosition(options);
			
			delay = options.delay || delay;
		};
		
		/*
		 * Returns the point's position.
		 */
		this.getPoint = function() {
			var position = this.getPosition();
			
			position.delay = delay;
			
			return position;
		};

		/*
		 * Set the point's delay.
		 * @param {Number} _delay - The new delay in milliseconds.
		 */
		this.setDelay = function(_delay) {
			if (_delay > 0)
				delay = _delay;
		};
		
		/*
		 * Get the point's delay.
		 */
		this.getDelay = function() {
			return {delay: delay};
		};
	};
	
	Point.prototype = Object.create(stg.Vector.prototype);
	
	return Point;
}(STG));