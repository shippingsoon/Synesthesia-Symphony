/*
 * @description - System configuration submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
*/

var System = System || {};

/*
 * Configuration submodule.
 * @param {Object} globals - Explicit global namespace.
 * @return {Object}
 */
System.Config = System.Cfg = (function(globals) {
	'use strict';
	
	return {
		//Determines if we will use sessions. If this game is not played on a server then this should be set to false.
		ONLINE: false,
		
		//Debug mode.
		DEBUG_MODE: true,
		
		//The targeted frames per second.
		TARGET_FPS: 30,
		
		//Project title.
		TITLE: 'Synesthesia Symphony',
		
		//Company name.
		COMPANY: 'Shipping Soon',
		
		//Version.
		VERSION: 'v0.06',
		
		//Player configuration.
		PLAYER: {
			//The player's initial lives.
			INITIAL_LIVES: 2,
			
			//The player's maximum power.
			MAX_POWER: 4,
			
			//The player's initial power.
			INITIAL_POWER: 0,
			
			//The player's speed.
			SPEED: 10,
			
			//The player's focused speed.
			FOCUS_SPEED: 5,
			
			//The player's hitbox radius.
			HITBOX_RADIUS: 5,
			
			//The player's invulnerability time out in milliseconds.
			INVULNERABILITY_TIMEOUT: 2000
		},
		
		//Path to MIDI files.
		MIDI_FILE_PATH: '/synesthesia-symphony/midi/',
		
		//Determines if we only use the grand piano.
		PIANO_ONLY: true,
	};
}(window)); 