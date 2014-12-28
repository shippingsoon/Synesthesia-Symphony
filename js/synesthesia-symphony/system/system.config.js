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
System.Config = System.Cfg = (function(globals) {
	"use strict";
	
	return {
		//Determines if we will use sessions. If this game is not played on a server then this should be set to false.
		ONLINE: false,
		
		//Debug mode.
		DEBUG: true,
		
		//Frames per second.
		TARGET_FPS: 30,
		
		//Version.
		VERSION: 'v0.01',
		
		//The player's initial lives.
		INITIAL_LIVES: 2,
		
		//The player's maximum power.
		MAX_POWER: 4,
		
		//The player's initial power.
		INITIAL_POWER: 0,
		
		//The player's speed.
		PLAYER_SPEED: 10,
		
		//The player's focused speed.
		PLAYER_FOCUS_SPEED: 10 / 2,
		
		//The player's hitbox radius.
		HITBOX_RADIUS: 6,
		
		//The average frames per second.
		fps: 0,
		
		//Screen resolutions.
		resolution: {
			width: [800, 1024],
			height: [600, 720],
			titles: ['Small', 'Medium'],
			selection: 0
		},
		
		//Difficulty settings.
		difficulty: {
			titles: ['Easy', 'Normal', 'Hard', 'Lunatic'],
			cleared: [false, false, false, false],
			selection: 0
		},
		
		//Current score.
		score: 0,
		
		//Hiscore.
		hiscore: 0,
		
		//Typically in a danmaku game you keep track of how much times you have grazed a bullet.
		//In this game we will keep track of how many times a player has come into contact with a safe colored bullet.
		//tl;dr Glaze is NOT a typo of graze.
		glaze: 0,
	};
}(window)); 