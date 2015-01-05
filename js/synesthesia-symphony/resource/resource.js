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
			buffer: new stg.Square({})
		},
		
		//Stage backgrounds.
		sprites: {
			stages_bg: [],
			canvas_bg: new stg.Square({}),
		},
		
		//Load resources.
		load: function(mode) {
			//Get the resolution mode. 0 is low, 1 is medium, 2 is large.
			var mode = (mode) ? mode : system.Config.resolution.selection;
			
			//Load the layer canvases.
			for (var layer in this.layers) {
				var canvas = document.getElementById(layer + '-layer');
				var ctx = canvas.getContext('2d');
				
				this.layers[layer].canvas = canvas;
				this.layers[layer].ctx = ctx
				this.layers[layer].setContext(ctx);
			}
			
			//Set the width and height of our screen layer canvas.
			this.layers.screen.canvas.width = system.Config.resolution.width[mode];
			this.layers.screen.canvas.height = system.Config.resolution.height[mode];
			this.layers.screen.setSquare({
				width: system.Config.resolution.width[mode],
				height: system.Config.resolution.height[mode]
			});

			//Load the stage background images.
			for (var stage = 0; stage < 6; stage++) {
				this.sprites.stages_bg.push(new stg.Square({}));
				if (this.sprites.stages_bg[stage].img = document.getElementById('stage-' + stage + '-r' + mode)) {
					this.sprites.stages_bg[stage].setSquare({
						width: this.sprites.stages_bg[stage].img.width,
						height: this.sprites.stages_bg[stage].img.height
					});
				}
			}
			
			//Load the canvas texture image.
			this.sprites.canvas_bg.img = document.getElementById('canvas-bg-r' + mode);
			
			//Use the canvas sprite's dimensions to set our buffer layer's dimensions.
			this.layers.buffer.canvas.width = this.sprites.canvas_bg.img.width;
			this.layers.buffer.canvas.height = this.sprites.canvas_bg.img.height;
			this.layers.buffer.setSquare({
				width: this.sprites.canvas_bg.img.width,
				height: this.sprites.canvas_bg.img.height
			});
		}
	};
}(window, System, STG, jQuery)); 
