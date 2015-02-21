/*
 * @description - Config menu state.
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
 * The config menu state.
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
FSM.Config = (function(globals, fsm, resource, stg, system, midi, canvas, vector) {
	'use strict';
	
	/*
	 * Config state.
	 * @param {Object} options.state - FSM state.
	 * @return {Undefined}
	 */
	function Config(options) {
		var state = new fsm.State(options.state || {});
		var options = [
			{title: 'Resolution', disabled: false, visible: true, value: ['800x600', '1280x720', '1920x1080']},
			{title: 'Master Volume', disabled: false, visible: true},
			{title: 'BGM Volume', disabled: false, visible: true},
			{title: 'SFX Volume', disabled: false, visible: true},
			{title: 'Auto Save', disabled: false, visible: true},
			{title: 'Return to Title', disabled: false, visible: true},
		];
		var menu_spacing = 50;
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
			//Play the background music.
			stg.Audio.playSong({
				song: songs['fairy_mountain'],
				setAnimation: stg.Audio.replayer
			});
			
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
			//Stop the music.
			mplayer.stop();
			
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
					//Move the menu index up and skip disabled options.
					menu_index = system.Menu.menuUp(menu_index, options);
					break;
				
				//Down key is pressed.
				case 40:
					//Move the menu index down and skip disabled options.
					menu_index = system.Menu.menuDown(menu_index, options);
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
			game.ctx.drawImage(sprites.config.img, 0, 0);
			
			//Common font settings.
			var common = {
				ctx: game.ctx,
				color: 'white',
				font: '26px arial',
				align: 'right',
				shadowColor: 'black',
				shadowBlur: 2,
				shadowoffsetX: 3,
				shadowoffsetY: 3,
				x: game.ctx.canvas.width / 2,
				y: (game.ctx.canvas.height / 2) - (options.length * menu_spacing) / 2
			};
			
			for (var option = 0, length = options.length; option < length; option++) {
				if (menu_index === options.indexOf(options[option]))
					font_color.setColor(255, 0, 0);
				else
					font_color.setColor(255, 255, 255);
				
				common.color = font_color;
				common.message = options[option].title;
				common.y = common.y + menu_spacing;
				canvas.text(common);
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
	
	return Config;
}(window, FSM, Resource, STG, System, MIDI, Canvas, Vector));