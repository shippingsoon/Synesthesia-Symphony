/*
	@description - Synesthesia Symphony's configuration submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};

//Configuration submodule.
System.Config = System.Cfg = (function(globals) {
	"use strict";
	
	return {
		//Determines if we will use sessions. If this game is not played on a server then this should be set to false.
		ONLINE: false,
		
		//Debug mode.
		DEBUG: true,
		
		//The targeted frames per second.
		TARGET_FPS: 30,
		
		//Project title.
		TITLE: 'Synesthesia Symphony',
		
		//Company name.
		COMPANY: 'Shipping Soon',
		
		//Version.
		VERSION: 'v0.05',
		
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
		HITBOX_RADIUS: 5,
		
		//The player's invulnerability time out in milliseconds.
		INVULNERABILITY_TIMEOUT: 2000,
		
		//Path to MIDI files.
		MIDI_FILE_PATH: '/synesthesia-symphony/midi/',
		
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
		
		//The master volume.
		volume: 127,
		
		//Current score.
		score: 0,
		
		//Hiscore.
		hiscore: 0,
		
		//Typically in a danmaku game you keep track of how much times you have grazed a bullet.
		//In this game we will keep track of how many times a player has come into contact with a safe colored bullet.
		//tl;dr Glaze is NOT a typo of graze.
		glaze: 0,
		
		//The rate in which the canvas scrolls down.
		canvas_scroll_rate: 2,
		
		//Determines if we show the average frames per second.
		show_fps: false,
	};
}(window)); 