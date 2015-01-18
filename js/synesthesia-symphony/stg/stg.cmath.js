/*
	@description - Color math submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//Color math submodule.
STG.Cmath = (function(globals, stg) {
	"use strict";
	
	return {
		/*
		 * Converts a hexidecimal string to an STG color.
		 * @param {String} hex - The hexidecimal color.
		 */
		hexToColor: function(hex) {
			var offset = (hex[0] === '#') ? 1 : 0;
			
			var red = parseInt(hex.slice(offset, offset + 2), 16);
			var green = parseInt(hex.slice(offset + 2, offset + 4), 16);
			var blue = parseInt(hex.slice(offset + 4, offset + 6), 16);
			
			return new stg.Color(red, green, blue);
		},
		
		/*
		 * Converts a string to an STG color.
		 * @param {String} color - The color string.
		 */
		stringToColor: function(color) {
			switch (color) {
				case 'red':
					return new stg.Color(255, 0, 0, 1);
					break;
					
				case 'green':
					return new stg.Color(0, 255, 0, 1);
					break;
					
				case 'blue':
					return new stg.Color(0, 0, 255, 1);
					break;
					
				default:
					return new stg.Color(0, 0, 0, 1);
			}
		},
		
		/*
		 * Compares two colors. Returns true or false depending on if the colors match.
		 * @param {STG.Color|String|Object} a - The first STG color, string or object to compare.
		 * @param {STG.Color|String|Object} b - The second STG color, string or object to compare.
		 */
		compareColor: function(a, b) {
			for (var argument = 0; argument < arguments.length; argument++) {
				if (typeof arguments[argument] === 'string') {
					//If we got a color in hexidecimal format.
					if (arguments[argument][0] === '#')
						arguments[argument] = stg.hexToColor(arguments[argument]);
					
					//If we got a color string.
					else
						arguments[argument] = stg.stringToColor(arguments[argument]);
				}
				
				//If this is an STG color.
				if (arguments[argument].hasOwnProperty('getColor'))
					arguments[argument] = arguments[argument].getColor();
			}
			
			//Compare the colors.
			return (
				arguments[0].r === arguments[1].r &&
				arguments[0].b === arguments[1].b &&
				arguments[0].g === arguments[1].g
			);
		},
		
		/*
		 * Compares two hexadecimal colors. Returns true or false depending on if the colors match.
		 * @param {STG.Color|String} a - The first hexadecimal string or STG color to compare.
		 * @param {STG.Color|String} b - The second hexadecimal string or STG color to compare.
		 */
		compareHexColor: function(a, b) {
			//If this is an STG color.
			if (a.hasOwnProperty('getColor'))
				a = a.getHex();
			
			//If this is an STG color.
			if (b.hasOwnProperty('getColor'))
				b = b.getHex();
			
			return (a === b);
		},
	};
}(window, STG)); 
