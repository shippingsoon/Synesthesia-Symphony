/*
 * @description - Initiates resources.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};
var STG = STG || {};
var Resource = Resource || {};
var FSM = FSM || {};
var Shape = Shape || {};

/*
 * Initiates resources.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Object} resource - Resource module.
 * @param {Shape} shape - Shape module.
 * @return {Function}
 */
Resource.init = (function(globals, system, stg, resource, shape) {
	'use strict';
	
	/*
	 * Initiate resources.
	 * @param {String} mode - The currently selected screen resolution.
	 * @return {Undefined}
	 */
	function init(mode) {
		var width = system.resolutions[mode].width;
		var height = system.resolutions[mode].height;
		
		//Load the sprites.
		for (var sprite in resource.sprites) {
			var element = sprite + '-' + mode;
			var image = document.getElementById(element);
			
			if (!image)
				throw 'Resource.init() error, image not found: ' + element;
			
			resource.sprites[sprite] = new shape.Square({width: image.width, height: image.height});
			resource.sprites[sprite].img = image;
		}
		
		//Load the canvas layers.
		for (var layer in resource.layers) {
			var element = layer + '-layer';
			var canvas = document.getElementById(element);
			
			if (!canvas)
				throw 'Resource.init() error, canvas not found: ' + element;
			
			var ctx = canvas.getContext('2d');
			
			canvas.width = width;
			canvas.height = height;
			resource.layers[layer] = new shape.Square({width: width, height: height});
			resource.layers[layer].canvas = canvas;
			resource.layers[layer].ctx = ctx;
			resource.layers[layer].setContext(ctx);
		}
		
		//Grab the canvas sprite's dimensions.
		var canvas = {
			width: resource.sprites.canvas.img.width,
			height: resource.sprites.canvas.img.height
		}
		
		//Use the canvas sprite's dimensions to set the buffer layer's dimensions.
		resource.layers[layer].canvas.width = canvas.width;
		resource.layers.buffer.canvas.height = canvas.height;
		resource.layers.buffer.setSquare({
			width: canvas.width,
			height: canvas.height
		});
		
		resource.layers.buffer.canvas.width = canvas.width;
		resource.layers.buffer.canvas.height = canvas.height;
		resource.layers.buffer.setSquare({
			width: canvas.width,
			height: canvas.height
		});
		
		//Use the canvas sprite's dimensions to set the pause layer's dimensions.
		resource.layers.pause.canvas.width = canvas.width;
		resource.layers.pause.canvas.height = canvas.height;
		resource.layers.pause.setSquare({
			width: canvas.width,
			height: canvas.height
		});
		
		//Set the color map.
		var synesthesia_map = MusicTheory.Synesthesia.map('D. D. Jameson (1844)');
		
		for (var map = 0; map < 12; map++) {
			if (synesthesia_map[map])
				resource.color_map.push(stg.Cmath.stringToColor(synesthesia_map[map].hex));
		}
	}
	
	return init;
}(window, System, STG, Resource, Shape)); 
