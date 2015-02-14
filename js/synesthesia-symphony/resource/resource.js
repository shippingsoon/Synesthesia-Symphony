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
			screen: new shape.Square({}),
			buffer: new shape.Square({}),
			pause: new shape.Square({}),
		},
		
		//Stage backgrounds.
		sprites: {
			stages_bg: [],
			canvas_bg: new shape.Square({}),
			menu: new shape.Square({}),
			staff: new shape.Square({})
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
		
		loading_gif: null,
	};
}(Shape)); 
