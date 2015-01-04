/*
	@description - Square submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//Square submodule.
STG.Square = (function(stg) {
	"use strict";
	
	 /*
	  * Square constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {Number} options.radius - The radius.
	  * @param {STG.Vector} options.position - Optional vector position.
	  */
	function Square(options) {
		//Reference to the current object.
		var that = this;
		
		//The position vector.
		var position = options.position || new stg.Vector({
			x: options.x || arguments[0] || 0,
			y: options.y || arguments[1] || 0
		});
		
		//The square's width.
		var width = options.width || options.w || arguments[2] || 10;
		
		//The square's height.
		var height = options.height || options.h || arguments[3] || 10;
		
		/*
		 * Sets the square.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.width - The width.
		 * @param {Number} options.height - The height.
		 */
		this.setSquare = this.setPosition = function(options) {
			position.setPosition(options);
			
			if (options.width !== undefined)
				width = options.width;
			
			if (options.height !== undefined)
				height = options.height;
		};
		
		/*
		 * Returns the square's position, width and height.
		 */
		this.getSquare = this.getPosition = function() {
			var _position = position.getPosition();
			_position.width = _position.w = width;
			_position.height = _position.h = height;
			
			return _position;
		};
	};
	
	return Square;
}(STG));