/*
	@description - Synesthesia Symphony's resource module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};

//This module handles resources.
var Resource = (function(globals, system, $) {
	"use strict";
	
	return {
		//Canvas layers.
		layers: {
			screen: null,
			buffer: null
		},
		
		//Stage backgrounds.
		sprites: {
			stages_bg: [],
			canvas_bg: null,
		},
		
		//Load resources.
		load: function(mode) {
			//Get the resolution mode. 0 is low, 1 is medium, 2 is large.
			var mode = (mode) ? mode : system.Config.resolution.selection;
			
			//Load the layer canvases.
			for (var layer in this.layers) {
				this.layers[layer] = document.getElementById(layer + '-layer');
				this.layers[layer].ctx = this.layers[layer].getContext('2d');
			}
			
			//Set the width and height of our screen layer canvas.
			this.layers.screen.width = system.Config.resolution.width[mode];
			this.layers.screen.height = system.Config.resolution.height[mode];

			//Load the stage background images.
			for (var stage = 0; stage < 6; stage++) {
				if (this.sprites.stages_bg[stage] = document.getElementById('stage-' + stage + '-r' + mode)) {
					//Set the coordinates of the stage background images. Lowercase x and y are apparently reserved on Firefox.
					this.sprites.stages_bg[stage].X = 0;
					this.sprites.stages_bg[stage].Y = 0;
				}
			}
			
			//Load the canvas texture image.
			this.sprites.canvas_bg = document.getElementById('canvas-bg-r' + mode);
			this.sprites.canvas_bg.X = this.layers.buffer.X = 0;
			this.sprites.canvas_bg.Y = this.layers.buffer.Y = 0;
			
			//Use the canvas sprite's dimensions to set our buffer layer's dimensions.
			this.layers.buffer.width = this.sprites.canvas_bg.width;
			this.layers.buffer.height = this.sprites.canvas_bg.height;
		}
	};
}(window, System, jQuery)); 
