/*
	@description - Synesthesia Symphony's STG module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

//Misc game mechanics module.
var STG = STG || (function(globals) {
	"use strict";
	
	return {
		/*
		 * Converts a hexidecimal string to an STG color.
		 * @param {String} _hex - The hexidecimal color.
		 */
		hexToColor: function(_hex) {
			var _red = parseInt(_hex.slice(1, 2), 16);
			var _green = parseInt(_hex.slice(3, 2), 16);
			var _blue = parseInt(_hex.slice(5, 2), 16);
			
			return new Color(_red, _green, _blue);
		},
		
		/*
		 * Converts a string to an STG color.
		 * @param {String} _color - The color string.
		 */
		stringToColor: function(_color) {
			switch (_color) {
				case 'red':
					return new Color(255, 0, 0, 1);
					break;
				case 'green':
					return new Color(0, 255, 0, 1);
					break;
				case 'blue':
					return new Color(0, 0, 255, 1);
					break;
				default:
					return new Color(0, 0, 0, 1);
			}
		},
	};
}(window)); 
