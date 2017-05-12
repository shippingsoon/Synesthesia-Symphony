/*
 * @description - Music room menu state.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Finite-State-Machine/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var Resource = Resource || {};
var STG = STG || {};
var System = System || {};

/*
 * The music room menu state.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {Resource} resource - Resource submodule.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System submodule.
 * @param {MIDI} midi - MIDI.js library.
 * @param {Canvas} canvas - Canvas module.
 * @param {Vector} vector - Vector module.
 * @return {Function}
 */
FSM.Music = (function(globals, fsm, resource, stg, system, midi, canvas, vector) {
	'use strict';
	
	/*
	 * Music room state.
	 * @param {Object} options.state - FSM state.
	 * @return {Undefined}
	 */
	function Music(options) {
		var state = new fsm.State(options.state || {});
		var options = [];
		var menu_spacing = 30;
		var menu_index = 0;
		var font_color = new stg.Color(0, 0, 0, 1);
		var sprites = resource.sprites;
		var mplayer = midi.Player;
		var songs = resource.songs;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
			//Set the menu options.
			for (var song in songs)
				options.push(song);
			
			//Set a final menu option for leaving this state.
			options.push('Return to Title');
			
			//Handle events for this state.
			globals.addEventListener('keydown', game.fsm.controller, false);
			
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {
			//Play the menu music.
			stg.Audio.playSong({
				song: songs['fairy_mountain'],
				setAnimation: stg.Audio.replayer
			});
			
			//Remove the events.
			globals.removeEventListener('keydown', game.fsm.controller, false);
		};
		
		/*
		 * Handle events for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @param {Number} game.event - Numeric event code.
		 * @return {Undefined}
		 */
		state.controller = function(game) {
			switch (game.event.keyCode) {
				//Up key is pressed.
				case 38:
					//Play a SFX.
					stg.Audio.playSfx(0, 74, 127, 0);
					
					//Move the menu index down.
					menu_index = (menu_index <= 0)
						? (options.length - 1)
						: (menu_index - 1);
						
					break;
				
				//Down key is pressed.
				case 40:
					//Play a SFX.
					stg.Audio.playSfx(0, 74, 127, 0);
					
					//Move the menu index up.
					menu_index = (menu_index === options.length - 1)
						? 0
						: (menu_index + 1);
					
					break;
				
				//X or Escape key is pressed.
				case 88:
				case 27:
					//Play a SFX.
					stg.Audio.playSfx(0, 77, 127, 0);
					
					//Return to the title menu.
					if (menu_index === options.length - 1)
						game.fsm.rewind({stop: true, ctx: game.ctx});
					
					//Bring the menu cursor to the last option.
					else
						menu_index = options.length - 1;
					break;
				
				//Z, Enter or Space key is pressed.
				case 90:
				case 32:
				case 13:
					//Play a SFX.
					stg.Audio.playSfx(0, 70, 127, 0);
					
					//If Return to Title is selected.
					if (menu_index === options.length - 1)
						game.fsm.rewind({stop: true, ctx: game.ctx});
					
					//Play a MIDI song.
					else 
						stg.Audio.playSong({
							song: songs[options[menu_index]],
							setAnimation: stg.Audio.replayer
						});
					
					break;
			}
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			//Draw the background image on the screen layer.
			game.ctx.drawImage(sprites.staff.img, 0, 0);
			
			//Common font settings.
			var common = {
				ctx: game.ctx,
				shadowColor: 'black',
				shadowBlur: 2,
				shadowoffsetX: 3,
				shadowoffsetY: 3,
				x: 540,
				y: game.ctx.canvas.height / 2
			};
			
			//The angle we will offset the font.
			var degrees = 110;
			var radians = 0;
			
			//The font's coordinates.
			var origin = {
				x: game.ctx.canvas.width / 2,
				y: game.ctx.canvas.height / 2
			};
			
			//Circular background decoration.
			common.color = 'rgba(0, 0, 0, 0.4)';
			common.radius = (game.ctx.canvas.width / 2.5) - (menu_index * 4);
			canvas.circle(common);
			
			//Circular background decoration.
			common.color = 'rgba(0, 0, 0, 0.2)';
			common.radius = game.ctx.canvas.width / 4;
			canvas.circle(common);
			
			//Circular background decoration.
			common.color = 'rgba(0, 0, 0, 0.3)';
			common.radius = game.ctx.canvas.width / 1.5;
			canvas.circle(common);
			
			//Loop through the title menu options.
			for (var option = 0, length = options.length; option < length; option++) {
				//Set the font's color.
				(menu_index === options.indexOf(options[option]))
					? font_color.setColor(0, 191, 255, 1)
					: font_color.setColor(255, 255, 255, 1);

				//Draw the menu options.
				degrees += 9;
				radians = stg.Math.degreeToRadian({degrees: degrees, invert: true});
				common.x = origin.x + (300 * Math.cos(radians)) || 0;
				common.y = origin.y + (300 * Math.sin(radians)) || 0;
				
				common.message = (option !== length - 1)
					? songs[options[option]].title
					: common.message = options[option];
				common.color = font_color;
				common.align = 'center';
				common.font = 'bold 16px arial'
				canvas.text(common);
				
				//Draw information for the currently selected song.
				if (menu_index === options.indexOf(options[option]) && option !== length - 1) {
					//The current song.
					var song = songs[options[option]];
					
					//Set the common font settings.
					common.x = 540;
					common.font = '19px open sans';
					common.color = '#FFFFFF';
					common.align = 'center';
					
					//Draw song's title.
					common.y = game.ctx.canvas.height / 2 - (menu_spacing * 2);
					common.message = 'Title: ' + song.title;
					canvas.text(common);
					
					//Draw series the song is from.
					common.y = game.ctx.canvas.height / 2 - (menu_spacing * 1);
					common.message = 'Series: ' + song.series;
					canvas.text(common);
					
					//Draw song's composer.
					common.y = game.ctx.canvas.height / 2 - (menu_spacing * 0);
					common.message = 'Composer: ' + song.composer;
					canvas.text(common);
					
					//Draw company that owns the song.
					common.y = game.ctx.canvas.height / 2 + (menu_spacing * 1);
					common.message = 'Company: ' + song.company;
					canvas.text(common);
					
					//Draw year the song was published.
					common.y = game.ctx.canvas.height / 2 + (menu_spacing * 2);
					common.message = 'Year: ' + song.year;
					canvas.text(common);
					
					//Draw song's arranger.
					common.y = game.ctx.canvas.height / 2 + (menu_spacing * 3);
					common.message = 'Arranger: ' + ((song.arranger) ? song.arranger : 'N/A');
					canvas.text(common);
				}	
			}
		};
		
		/*
		 * Return the state.
		 * @return {FSM.State} - An FSM state.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Music;
}(window, FSM, Resource, STG, System, MIDI, Canvas, Vector));