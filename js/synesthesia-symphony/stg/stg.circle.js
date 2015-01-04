/*
	@description - Circle submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//Circle submodule.
STG.Circle = (function(stg) {
	"use strict";
	
	 /*
	  * Circle constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {STG.Vector} options.position - A vector position.
	  * @param {Number} options.radius - The radius.
	  */
	function Circle(options) {
		//Reference to the current object.
		var that = this;
		
		//The position vector.
		var position = options.position || new stg.Vector({
			x: options.x || arguments[0] || 0,
			y: options.y || arguments[1] || 0
		});
		
		//The circle's radius.
		var radius = options.radius || options.r || arguments[2] || 10;
		
		/*
		 * Sets the circle.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.radius - The radius.
		 */
		this.setCircle = this.setPosition = function(options) {
			position.setPosition(options);
			
			radius = options.radius || options.r || radius;
		};
		
		/*
		 * Returns the circle's position and radius.
		 */
		this.getCircle = this.getPosition = function() {
			var _position = position.getPosition();
			_position.radius = _position.r = radius;
			
			return _position;
		};

		/*
		 * Set the player's radius.
		 * @param {Number} _radius - The new radius.
		 */
		this.setRadius = function(_radius) {
			radius = _radius;
		};
		
		/*
		 * Get the player's radius.
		 */
		this.getRadius = function() {
			return {radius: radius};
		};
	};
	
	return Circle;
}(STG));