/*
	@description - Color submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var STG = STG || {};

//Color submodule.
STG.Color = (function(stg) {
	"use strict";
	
	 /*
	  * Color constructor.
	  * @param {Object} options.r - Red.
	  * @param {Object} options.g - Green.
	  * @param {Object} options.b - Blue.
	  * @param {Object} options.a - Alpha.
	  */
	function Color(options) {
		var that = this;
		
		//Set the hues.
		var red = (typeof arguments[0] === 'number') ? arguments[0] : (options.r || 0);
		var green = (typeof arguments[1] === 'number') ? arguments[1] : (options.g || 0);
		var blue = (typeof arguments[2] === 'number') ? arguments[2] : (options.b || 0);
		
		//Set the alpha.
		var alpha = (typeof arguments[3] === 'number') ? arguments[3] : (((options.a !== undefined) ? options.a : 1));
		
		/*
		 * Returns the color.
		 */
		this.getColor = function() {
			return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha +')';
		};
		
		/*
		 * Sets the color.
		 * @param {Object} options.r - Red.
		 * @param {Object} options.g - Green.
		 * @param {Object} options.b - Blue.
		 * @param {Object} options.a - Alpha.
		 */
		this.setColor = function(options) {
			//Set the hues.
			red = (typeof arguments[0] === 'number') ? arguments[0] : (options.r || 0);
			green = (typeof arguments[1] === 'number') ? arguments[1] : (options.g || 0);
			blue = (typeof arguments[2] === 'number') ? arguments[2] : (options.b || 0);
			alpha = (typeof arguments[3] === 'number') ? arguments[3] : (((options.a !== undefined) ? options.a : 1));
			
			//Make sure the values are valid.
			validateColor();
		};
		
		/*
		 * Returns the hexadecimal color.
		 */
		this.getHex = function() {
			return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
		};
		
		/*
		 * Makes sure we have a valid color range.
		 */
		function validateColor() {
			if (red < 0)
				red = 0;
			if (red > 255)
				red = 255;
			
			if (green < 0)
				green = 0;
			if (green > 255)
				green = 255;
				
			if (blue < 0)
				blue = 0;
			if (blue > 255)
				blue = 255;
				
			if (alpha < 0)
				alpha = 0;
			if (alpha > 1)
				alpha = 1;
		};
		
		//Make sure the color values are valid.
		validateColor();
		
		return this.getColor();
	};
	
	return Color;
}(STG));