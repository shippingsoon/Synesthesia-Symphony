/*
	@description - Color submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
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
		//A reference to the current object.
		var that = this;
		
		//Set the hues.
		var red = (typeof arguments[0] === 'number') ? arguments[0] : (options.r || 0);
		var green = (typeof arguments[1] === 'number') ? arguments[1] : (options.g || 0);
		var blue = (typeof arguments[2] === 'number') ? arguments[2] : (options.b || 0);
		
		//Set the alpha.
		var alpha = (typeof arguments[3] === 'number') ? arguments[3] : (((options.a !== undefined) ? options.a : 1));
		
		//The color in hexadecimal format.
		var hex = null;
		
		//The color in RGBA format.
		var rgba = null;
		
		/*
		 * Sets the color.
		 * @param {Number} options.r - Red.
		 * @param {Number} options.g - Green.
		 * @param {Number} options.b - Blue.
		 * @param {Number} options.a - Alpha.
		 */
		this.setColor = function(options) {
			//Set the hues.
			red = (typeof arguments[0] === 'number') ? arguments[0] : (options.r || options.red || 0);
			green = (typeof arguments[1] === 'number') ? arguments[1] : (options.g || options.green || 0);
			blue = (typeof arguments[2] === 'number') ? arguments[2] : (options.b || options.blue || 0);
			alpha = (typeof arguments[3] === 'number')
				? arguments[3]
				: (((options.a !== undefined || options.alpha !== undefined) ? options.a || options.alpha: 1));
			
			//Make sure the values are valid.
			validateColor();	
		};
		
		/*
		 * Returns the colors.
		 */
		this.getColor = function() {
			return {
				red: red, r: red,
				green: green, g: green,
				blue: blue, b: blue,
				alpha: alpha, a: alpha,
				hex: hex,
				rgba: rgba
			};
		};	
		
		/*
		 * Sets the color's alpha (transparency).
		 * @param {Number} _alpha - The alpha (transparency).
		 */
		this.setAlpha = function(_alpha) {
			alpha = _alpha;
			
			//Make sure the value is valid.
			validateColor();	
		};
		
		/*
		 * Returns the color's alpha (transparency).
		 */
		this.getAlpha = function() {
			return {alpha: alpha, a: alpha};
		};
		
		/*
		 * Returns the color in RGBA format.
		 */
		this.getRGBA = function() {
			return {rgba: rgba};
		};
		
		/*
		 * Returns the color in hexadecimal format.
		 */
		this.getHex = function() {
			return {hex: hex};
		};
		
		/*
		 * Returns a hexadecimal color.
		 * @param {Sting} _hex - The hexadecimal color.
		 */
		function buildHex() {
			var _hex = '#';
			
			_hex += (red > 15) ? red.toString(16) : '0' + red.toString(16);
			_hex += (green > 15) ? green.toString(16) : '0' + green.toString(16);
			_hex += (blue > 15) ? blue.toString(16) : '0' + blue.toString(16);
			
			return _hex;
		};
		
		/*
		 * Returns the color in RGBA format.
		 */
		function buildRGBA() {
			return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha +')';
		};
		
		/*
		 * Makes sure we have a valid color range. The min and max range is 0 and 255.
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
			
			hex = buildHex();
			
			rgba = buildRGBA();
		};
		
		//Make sure the color values are valid.
		validateColor();
	};
	
	return Color;
}(STG));