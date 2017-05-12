/*
 * @description - Synesthesia Symphony's system module.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * This module handles miscellaneous system related task and resources.
 * @return {Object}
 */
var System = (function() {
	'use strict';
	
	return {
		//Finite state machine.
		fsm: null,
		
		//The master volume. This will determine the min and max volume of the background music and sound effects.
		volume: 127,
		
		//The background music volume.
		bgm_volume: 127,
		
		//The sound effects volume.
		sfx_volue: 127,
		
		//Current score.
		score: 0,
		
		//Hiscore.
		hiscore: 0,
		
		//Typically in a danmaku game you keep track of how much times the player has grazed a bullet.
		//In this game we will keep track of how many times a player has come into contact with a safe colored bullet.
		//tl;dr Glaze is NOT a typo of graze.
		glaze: 0,
		
		//Screen resolutions.
		resolutions: {
			low: {
				width: 800,
				height: 600,
				title: '800x600'
			},
			
			medium: {
				width: 1024,
				height: 720,
				title: '1024x720'
			},
			
			high: {
				width: 1920,
				height: 1080,
				title: '1920x1080'
			}
		},
		
		//The currently selected screen resolution.
		resolution_idx: 'low',
		
		//Difficulty modes.
		difficulties: {
			easy: {
				title: 'Easy',
				cleared: false,
				one_credit_clear: false
			},
			
			normal: {
				title: 'Normal',
				cleared: false,
				one_credit_clear: false
			},
			
			hard: {
				title: 'Hard',
				cleared: false,
				one_credit_clear: false
			},
			
			lunatic: {
				title: 'Lunatic',
				cleared: false,
				one_credit_clear: false
			}
		},
		
		//The currently selected difficulty.
		difficulty_idx: 'easy',
		
		//Determines if we show the average frames per second.
		show_fps: false,
		
		//The average frames per second.
		fps: 0,
		
		//The rate in which the canvas scrolls down.
		canvas_scroll_rate: 3,
	};
}()); 
