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
			{title: 'Resolution', disabled: false, visible: true},
			{title: 'Master Volume', disabled: true, visible: false},
			{title: 'BGM Volume', disabled: false, visible: true},
			{title: 'SFX Volume', disabled: false, visible: true},
			{title: 'Show FPS', disabled: false, visible: true},
			{title: 'Return to Title', disabled: false, visible: true},
		];
		var resolution_keys = Object.keys(system.resolutions);
		var resolution_idx = resolution_keys.indexOf(system.resolution_idx);
		var menu_spacing = 50;
		var menu_index = 0;
		var font_color = new stg.Color(0, 0, 0, 1);
		var sprites = resource.sprites;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
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
				
				//Key Right.
				case 39:		
					switch (menu_index) {
						case 0:
							if (resolution_idx < resolution_keys.length - 1)
								system.resolution_idx = resolution_keys[++resolution_idx];
							break;
						
						case 1:
							if (system.volume < 100)
								system.volume += 5;
							break;
						
						case 2:
							if (system.bgm_volume < 100)
								system.bgm_volume += 5;
							break;
						
						case 3:
							if (system.sfx_volume < 100)
								system.sfx_volume += 5;
							break;
						
						case 4:
							system.show_fps = true;
							break;
					}
					
					stg.Audio.playSfx(0, 61, 127, 0);
					break;
				
				//Key Left.
				case 37:
					switch (menu_index) {
						case 0:
							if (resolution_idx > 0)
								system.resolution_idx = resolution_keys[--resolution_idx];
							break;
						
						case 1:
							if (system.volume > 0)
								system.volume -= 5;
							break;
						
						case 2:
							if (system.bgm_volume > 0)
								system.bgm_volume -= 5;
							break;
						
						case 3:
							if (system.sfx_volume > 0)
								system.sfx_volume -= 5;
							break;
						
						case 4:
							system.show_fps = false;
							break;
					}
					
					stg.Audio.playSfx(0, 60, 127, 0);
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
				font: 'bold 26px arial',
				shadowColor: 'black',
				shadowBlur: 2,
				shadowoffsetX: 3,
				shadowoffsetY: 3,
				y: (game.ctx.canvas.height / 2) - (options.length * menu_spacing) / 2
			};
			
			for (var option = 0, length = options.length; option < length; option++) {
				if (!options[option].visible)
					continue;
					
				if (menu_index === options.indexOf(options[option]))
					font_color.setColor(255, 0, 0);
				else
					font_color.setColor(255, 255, 255);
				
				common.color = font_color;
				common.message = options[option].title;
				common.y = common.y + menu_spacing;
				common.x = game.ctx.canvas.width / 2;
				common.align = 'right';
				
				if (option === options.length - 1) {
					common.align = 'center';
					common.y = game.ctx.canvas.height - 40;
				}
				
				canvas.text(common);
				
				switch (option) {
					case 0:
						common.message = system.resolutions[system.resolution_idx].title;
						break;
					
					case 1:
						common.message = system.volume.toString();
						break;
					
					case 2:
						common.message = system.bgm_volume.toString();
						break;
					
					case 3:
						common.message = system.sfx_volume.toString();
						break;
					
					case 4:
						common.message = (system.show_fps) ? 'On' : 'Off';
						break;
						
					default:
						common.message = '';
				}
				
				common.x += 20;
				common.align = 'left';
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