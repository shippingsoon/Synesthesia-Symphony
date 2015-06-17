/*
 * @description - Color math submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var STG = STG || {};

/*
 * Color math submodule.
 * @param {Object} globals - Explicit global namespace.
 * @param {STG} stg - Miscellaneous game module.
 * @return {Object}
 */
STG.Cmath = (function(globals, stg) {
	'use strict';
	
	return {
		/*
		 * Converts a string to an STG color. Accepts hex, rgba, and names of colors.
		 * @param {String} color - The hex, hsla, or rgba values of the color.
		 * @return {STG.Color}
		 */
		stringToColor: function(color) {
			var colors = parseCSSColor(color) || [0, 0, 0, 1];
			var red = colors[0];
			var green = colors[1];
			var blue = colors[2];
			var alpha = colors[3];
			
			return new stg.Color(red, green, blue, alpha);
		},
		
		/*
		 * Compares two colors. Returns true or false depending on if the colors match.
		 * @param {STG.Color|String|Object} a - The first STG color, string or object to compare.
		 * @param {STG.Color|String|Object} b - The second STG color, string or object to compare.
		 * @return {Boolean}
		 */
		compareColor: function(a, b) {
			//Array of colors to compare.
			var color = [];
			
			//Loop through each argument and convert them to STG colors.
			for (var argument = 0; argument < arguments.length; argument++) {
				//If this is a string convert it to an STG color.
				if (typeof arguments[argument] === 'string')
					arguments[argument] = this.stringToColor(arguments[argument]);
				
				//If this is an STG color retrieve its color values.
				if (arguments[argument] && arguments[argument].getColor) {
					colors.push(arguments[argument].getColor());
				}
				else
					return false;
			}
			
			//Compare the colors.
			return (
				colors[0].r === colors[1].r &&
				colors[0].b === colors[1].b &&
				colors[0].g === colors[1].g
			);
		},
		
		/*
		 * Compares two hexadecimal colors. Returns true or false depending on if the colors match.
		 * @param {STG.Color|String} a - The first hexadecimal string or STG color to compare.
		 * @param {STG.Color|String} b - The second hexadecimal string or STG color to compare.
		 * @return {Boolean}
		 */
		compareHexColor: function(a, b) {
			//If this is an STG color.
			if (a && a.getHex)
				a = a.getHex();
			
			//If this is an STG color.
			if (b && b.getHex)
				b = b.getHex();
			
			return (a === b);
		},
	};
}(window, STG)); 
