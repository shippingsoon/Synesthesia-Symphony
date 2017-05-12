/*
 * @description - Synesthesia Symphony's resource module.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Shape = Shape || {};

/*
 * This module handles resources.
 * @param {Shape} shape - Shape module.
 * @return {Object}
 */
var Resource = (function(shape) {
	'use strict';
	
	return {
		//Canvas layers.
		layers: {
			screen: null,
			buffer: null,
			pause: null,
		},
		
		//Stage backgrounds.
		sprites: {
			stage_0: null,
			canvas: null,
			menu: null,
			staff: null,
			config: null,
			loading_gif: null
		},
		
		//Color map.
		color_map: [],
		
		//The player.
		player: null,
		
		//The enemies.
		enemies: [],
		
		//The bullets.
		bullets: [],
		
		//The items.
		items: [],
		
		//The piano notes.
		notes: [],
	};
}(Shape)); 
