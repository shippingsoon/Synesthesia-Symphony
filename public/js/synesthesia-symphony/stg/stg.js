/*
 * @description - Synesthesia Symphony's STG module.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * Misc game mechanics module.
 * @return {Object}
 */
var STG = (function() {
	'use strict';
	
	return {
		//An enumerated list of targets.
		targets: {
			player: 0,
			enemy: 1,
			bullet: 2,
			item: 3,
			note: 4
		},
	};
}()); 
