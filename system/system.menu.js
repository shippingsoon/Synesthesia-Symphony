/*
 * @description - System menu submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
*/

var System = System || {};
var STG = STG || {};

/*
 * System menu submodule.
 * @param {Object} globals - Explicit global namespace.
 * @return {Object}
 */
System.Menu = (function(globals, stg) {
	'use strict';
	
	return {
		/*
		 * Moves a menu index up.
		 * @param {Number} menu_index - The menu index.
		 * @param {Object} options - Menu options.
		 * @return {Undefined}
		 */
		menuUp: function (menu_index, options) {
			//Menu options length.
			var length = options.length;
			
			//Play a SFX.
			stg.Audio.playSfx(0, 74, 127, 0);
			
			//Move the menu index down.
			menu_index = (menu_index <= 0)
				? (length - 1)
				: (menu_index - 1);
			
			//Skip disabled options.
			for (var skip = 0; options[menu_index].disabled && skip < length; skip++) {
				menu_index--;
				
				if (menu_index < 0)
					menu_index = length -1;
			}
			
			return menu_index;
		},
		
		/*
		 * Moves a menu index down.
		 * @param {Number} menu_index - The menu index.
		 * @param {Object} options - Menu options.
		 * @return {Undefined}
		 */
		menuDown: function (menu_index, options) {
			//Menu options length.
			var length = options.length;
			
			//Play a SFX.
			stg.Audio.playSfx(0, 74, 127, 0);
			
			//Move the menu index down.
			menu_index = (menu_index === length - 1)
				? 0
				: (menu_index + 1);
			
			//Skip disabled menu options.
			for (var skip = 0; options[menu_index].disabled && skip < length; skip++) {
				if (menu_index === length - 1)
					menu_index = 0;
				
				menu_index++;
			}
			
			return menu_index;
		}
		
		
	};
}(window, STG)); 