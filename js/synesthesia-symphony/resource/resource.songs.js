/*
 * @description - Initiates resources.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};

/*
 * MIDI songs.
 * @param {Object} system - System module.
 */
Resource.songs = (function(system) {
	'use strict';
	
	//Path to MIDI files.
	var file_path = system.Config.MIDI_FILE_PATH;
	
	//MIDI songs.
	return {
		//The intro music that is played when the page is loaded.
		intro: {
			file: file_path + 'intro.mid',
			title: 'Angel Island Act 1',
			series: 'Sonic The Hedgehog 3',
			composer: 'Jun Senoue',
			year: '1994',
			company: 'Sega',
			arranger: '',
			channels: {
				0: 114,
				1: 37,
				2: 39,
				3: 76,
				4: 62,
				5: 63,
				6: 80,
				7: 88,
				8: 79,
				9: 0,
				10: 81
			},
		},
		
		//Fairy Fountain.
		fairy_mountain: {
			file: file_path + 'fairy-mountain.mid',
			title: 'Great Fairy Mountain',
			series: 'Legend of Zelda: Ocarina of Time',
			composer: 'Koji Kondo',
			year: '1998',
			company: 'Nintendo',
			arranger: '',
			channels: {
				0: 1,
				1: 46,
				2: 2,
				3: 24,
				4: 50,
				5: 89,
				6: 24
			},
		},
		
		//Sky chase zone.
		sky_chase_zone: {
			file: file_path + 'sky-chase-zone.mid',
			title: 'Sky Chase Zone',
			series: 'Sonic The Hedgehog 2',
			composer: 'Masato Nakamura',
			year: '1992',
			company: 'Sega',
			arranger: '',
			channels: {
				0: 33,
				1: 18,
				2: 18,
				3: 94,
				4: 58,
				5: 60,
				6: 49,
				7: 15,
				8: 95,
				9: 116,
				10: 58,
				11: 5,
				12: 78,
				13: 15
			},
		}
	};
}(System)); 
