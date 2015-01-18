/*
	@description - Synesthesia Symphony's sub module for characters.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};
var STG = STG || {};
var Resource = Resource || {};

//This sub module contains character related data structures.
STG.Character = (function(globals, system, stg, resource) {
	"use strict";
	
	return {
		protagonist: {
			//The protagonist's names.
			names: ['Lorem', 'Ipsum'],
			
			//The titles of the protagonist.
			titles: ['The lorem', 'The ipsum'],
			
			//A description of the protagonist.
			descriptions: [
				'lorem lorem',
				'ipsum ipsum',
			],
			
			//The player's weapons.
			weapons: {
				//Title of the weapon.
				titles: [
					['Homing Type', 'Forward Focus Type', 'Sealing Type'],
					['High-Power Type', 'Piercing Type', 'Magic-User Type'],
				],
				
				//The color of the weapons.
				colors: [
					[
						[new stg.Color(0, 0, 255), new stg.Color(153, 50, 204)],
						[new stg.Color(0, 0, 255), new stg.Color(153, 50, 204)],
						[new stg.Color(0, 0, 255), new stg.Color(153, 50, 204)]
					],
					[
						[new stg.Color(0, 0, 255), new stg.Color(153, 50, 204)],
						[new stg.Color(0, 0, 255), new stg.Color(153, 50, 204)],
						[new stg.Color(0, 0, 255), new stg.Color(153, 50, 204)]
					],
				],
				
				//Description of the weapons.
				descriptions: [
					['Homing Amulet', 'Sealing Needle', 'Youkai Buster'],
					['Spread Star', 'Illusion Laser', 'Cold Inferno'],
				]
			},
			
			//The protagonist and weapon array indexes. By default player Lorem is selected with the Homing Type weapon.
			player_idx: 0,
			weapon_idx: 0
		}
	};
}(window, System, STG, Resource));