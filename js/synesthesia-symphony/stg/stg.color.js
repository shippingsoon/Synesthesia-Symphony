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
		var hex = buildHex();
		
		/*
		 * Returns the colors.
		 */
		this.getColor = function() {
			return {
				red: red, r: red,
				green: green, g: green,
				blue: blue, b: blue,
				alpha: alpha, a: alpha,
				hex: hex, h: hex
			};
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
			
			//The color in hexadecimal format.
			hex = buildHex();
		};
		
		/*
		 * Returns the color in RGBA format.
		 */
		this.getRGBA = function() {
			return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha +')';
		};
		
		/*
		 * Sets the hex color.
		 * @param {Sting} _hex - The hex color.
		 */
		this.setHex = function(_hex) {
			hex = _hex;
		};
		
		/*
		 * Returns the color in hexadecimal format.
		 */
		this.getHex = function() {
			return {hex: hex};
		};
		
		/*
		 * Compares two colors. Returns true or false depending on if the colors match.
		 * @param {STG.Color|String|Object} _color - The color to compare.
		 */
		this.compare = function(_color) {
			if (typeof _color === 'string') {
				//If we got a color in hexidecimal format.
				if (_color[0] === '#')
					_color = stg.hexToColor(_color);
				
				//If we got a color string.
				else
					_color = stg.stringToColor(_color);
			}
			
			//If this is an STG color.
			if (_color.hasOwnProperty('getColor'))
				_color = _color.getColor();
			
			return (red === _color.r && blue === _color.b && green === _color.g);
		};
		
		/*
		 * Returns a hexadecimal color.
		 * @param {Sting} _hex - The hexadecimal color.
		 */
		function buildHex() {
			var _hex = '#';
			_hex += (red > 9) ? red.toString(16) : '0' + red.toString(16);
			_hex += (green > 9) ? green.toString(16) : '0' + green.toString(16);
			_hex += (blue > 9) ? blue.toString(16) : '0' + blue.toString(16);
			
			return _hex;
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
		
		hex = buildHex();
	};
	
	return Color;
}(STG));