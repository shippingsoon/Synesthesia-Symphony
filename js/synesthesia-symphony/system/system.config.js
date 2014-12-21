/*
	@description - Synesthesia Symphony's configuration module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var System = System || {};

//Synesthesia Symphony's configuration module. 
System.Config = System.cfg = (function(globals) {
	"use strict";
	
	return {
		//Determines if we will use sessions. If this game is not played on a server then this should be set to false.
		online: true,
		
		//Debug mode.
		debug: true,
		
		//Frames per second.
		FPS: 30,
		
		//Version.
		VERSION: 'v0.01',
		
		//Screen resolutions.
		resolution: {
			width: [800, 1024],
			height: [600, 720],
			titles: ['Small', 'Medium'],
			mode: 0
		}
	};
}(window)); 