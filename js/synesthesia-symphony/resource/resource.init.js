/*
	@description - Initiates resources.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};
var STG = STG || {};
var Resource = Resource || {};
var FSM = FSM || {};

//Initiates resources.
Resource.init = (function(globals, system, stg, fsm, resource) {
	"use strict";
	
	/*
	 * Initiate resources.
	 */
	function init() {
		//Get the resolution mode. 0 is low, 1 is medium, 2 is large.
		var mode = system.Config.resolution.selection;
			
		//Load the layer canvases.
		for (var layer in resource.layers) {
			var canvas = document.getElementById(layer + '-layer');
			var ctx = canvas.getContext('2d');
			
			resource.layers[layer].canvas = canvas;
			resource.layers[layer].ctx = ctx
			resource.layers[layer].setContext(ctx);
		}
		
		//Set the width and height of our screen layer canvas.
		resource.layers.screen.canvas.width = system.Config.resolution.width[mode];
		resource.layers.screen.canvas.height = system.Config.resolution.height[mode];
		resource.layers.screen.setSquare({
			width: system.Config.resolution.width[mode],
			height: system.Config.resolution.height[mode]
		});
		
		

		//Load the stage background images.
		for (var stage = 0; stage < 6; stage++) {
			resource.sprites.stages_bg.push(new stg.Square({}));
			if (resource.sprites.stages_bg[stage].img = document.getElementById('stage-' + stage + '-r' + mode)) {
				resource.sprites.stages_bg[stage].setSquare({
					width: resource.sprites.stages_bg[stage].img.width,
					height: resource.sprites.stages_bg[stage].img.height
				});
			}
		}
		
		//Load the canvas texture image.
		resource.sprites.canvas_bg.img = document.getElementById('canvas-bg-r' + mode);
		
		//Use the canvas sprite's dimensions to set our buffer layer's dimensions.
		resource.layers.buffer.canvas.width = resource.sprites.canvas_bg.img.width;
		resource.layers.buffer.canvas.height = resource.sprites.canvas_bg.img.height;
		resource.layers.buffer.setSquare({
			width: resource.sprites.canvas_bg.img.width,
			height: resource.sprites.canvas_bg.img.height
		});
		
		//Load the title menu image.
		resource.sprites.menu.img = document.getElementById('menu-r' + mode);
		
		//Initiate the pause layer.
		resource.layers.pause.canvas.width = resource.sprites.canvas_bg.img.width;
		resource.layers.pause.canvas.height = resource.sprites.canvas_bg.img.height;
		resource.layers.pause.setSquare({
			width: resource.sprites.canvas_bg.img.width,
			height: resource.sprites.canvas_bg.img.height
		});
		
		//Set the color map.
		var synesthesia_map = MusicTheory.Synesthesia.map('D. D. Jameson (1844)');
		
		for (var map = 0; map < 12; map++) {
			if (synesthesia_map[map])
				resource.color_map.push(stg.Cmath.hexToColor(synesthesia_map[map].hex));
		}
		
		//The loading gif.
		resource.loading_gif = document.getElementById('loading-gif');
	}
	
	return init;
}(window, System, STG, FSM, Resource)); 
