/*
	@description - Synesthesia Symphony's configuration module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var System = System || {};
var FSM = FSM || {};

//This module handles sessions.
var Resource = Resource || (function(globals, system, $) {
	"use strict";
	
	return {
		//Canvas layers.
		layers: {
			screen: null
		},
		
		//Stage backgrounds.
		sprites: {
			stages_bg: [],
			canvas_bg: null,
		},
		
		//Load resources.
		load: function(mode) {
			var mode = (mode) ? mode : system.Config.resolution.mode;
			
			//Load the sceen layer canvas and set its size.
			this.layers.screen = document.getElementById('screen-layer');
			this.layers.screen.ctx = this.layers.screen.getContext('2d');
			this.layers.screen.width = system.Config.resolution.width[mode];
			this.layers.screen.height = system.Config.resolution.height[mode];
			
			//Load the stage background images.
			for (var stage = 0; stage < 6; stage++) {
				if (this.sprites.stages_bg[stage] = document.getElementById('stage-'+stage+'-r'+mode)) {
					this.sprites.stages_bg[stage].x = 0;
					this.sprites.stages_bg[stage].y = 0;
				}
			}
			
			//Load the canvas texture image.
			this.sprites.canvas_bg = document.getElementById('canvas-bg-r'+mode);
			this.sprites.canvas_bg.x = 0;
			this.sprites.canvas_bg.y = 0;
			
			
		}
	};
}(window, System, jQuery)); 
