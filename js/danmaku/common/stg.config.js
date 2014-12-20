/*
	@description - Danmaku configuration module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/TBA
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var STG = STG || {};

//Danmaku module. 
STG.Config = STG.cfg = (function(globals) {
	"use strict";
	
	return {
		//Frames per second.
		FPS: 30,
		
		//Version.
		VERSION: "v0.01",
		
		//The canvas' width.
		CANVAS_WIDTH: 800,
		
		//The Canvas' height.
		CANVAS_HEIGHT: 600,
		
		//Debug mode.
		debug: false, 
		
		//The canvas layers.
		layers: document.getElementsByTagName('canvas'),
		
		//Odd paint layer.
		ODD_LAYER: 0,
		
		//Even paint layer.
		EVEN_LAYER: 1,
		
		//Sprite Layer.
		SPRITE_LAYER: 2,
	};
}(window)); 