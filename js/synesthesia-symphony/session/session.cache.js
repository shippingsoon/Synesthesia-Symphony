/*
 * @description - Offline resources.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Session = Session || {};

/*
 * Offline resources.
 * @return {Object}
 */
Session.cache = (function() {
	'use strict';
	
	return {
		hiscore: 4000,
		resolution_idx: 'low',
		volume: 120,
		bgm_volume: 120,
		sfx_volume: 120,
		show_fps: true
	};
}()); 
