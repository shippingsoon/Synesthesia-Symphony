/*
	@description - Synesthesia Symphony's resource module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};
var STG = STG || {};

//This module handles resources.
var Resource = (function(globals, system, stg, $) {
	"use strict";
	
	return {
		//Canvas layers.
		layers: {
			screen: new stg.Square({}),
			buffer: new stg.Square({}),
			pause: new stg.Square({}),
		},
		
		//Stage backgrounds.
		sprites: {
			stages_bg: [],
			canvas_bg: new stg.Square({}),
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
}(window, System, STG, jQuery)); 
