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
		hiscore: 2000,
		resolution_idx: 'low',
		volume: 0,
		bgm_volume: 0,
		sfx_volume: 0,
		show_fps: true
	};
}()); 
