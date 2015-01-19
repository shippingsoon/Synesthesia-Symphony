/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};

//Pause state.
FSM.Pause = (function(globals, fsm, stg, resource, midi) {
	"use strict";
	
	function Pause(options) {
		var state = new fsm.State(options);
		var options = ['Resume Game', 'Go to Start Menu', 'Quit Game'];
		var menu_spacing = 50;
		var menu_index = 0;
		var bg_color = new stg.Color(0, 0, 0, 0.8)
		var layers = resource.layers;
		var ctx = layers.pause.getContext();
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Handle events for this state.
			globals.addEventListener('keyup', game.fsm.controller, false);
			
			setTimeout(function() {
				if (midi.Player.playing)
					midi.Player.pause();
			}, 4000);
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.stop = function(game) {
			//Remove the event.
			globals.removeEventListener('keyup', game.fsm.controller, false);
			
			//Clear the 2D rendering context.
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		};
		
		/*
		 * Handle events for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @param {Number} game.event - Numeric event code.
		 */
		state.controller = function(game) {
			switch (game.event.keyCode) {
				//Escape key is pressed return to the stage state.
				case 27:
					game.fsm.rewind({pause: true});
					break;
				
				//Up key is pressed select a new menu item.
				case 38:
					//Play a SFX.
					midi.noteOn(0, 74, 127, 0);
					
					menu_index = (menu_index <= 0)
						? (options.length - 1)
						: (menu_index - 1);
					break;
				
				//Down key is pressed select a new menu item.
				case 40:
					//Play a SFX.
					midi.noteOn(0, 74, 127, 0);
					
					menu_index = (menu_index === options.length - 1)
						? 0
						: (menu_index + 1); 
					break;
				
				//If Z, Enter or Space keys are pressed.
				case 90:
				case 13:
				case 32:
					//Play a SFX.
					midi.noteOn(0, 70, 127, 0);
					
					//Return to the stage state.
					if (menu_index === 0)
						game.fsm.rewind({pause: true});
					
					//Return to the menu state.
					else if (menu_index === 1) {
						//
					}
					
					//Return to the intro state.
					else if (menu_index === 2) {
						//
					}
					break;
			}
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			
			//Draw the background.
			stg.Canvas.square({
				ctx: ctx,
				x: 0,
				y: 0,
				width: ctx.canvas.width,
				height: ctx.canvas.height,
				color: bg_color,
			});
			
			//Draw the menu options.
			for (var option = 0, length = options.length; option < length; option++) {
				var color = (menu_index === options.indexOf(options[option]))
					? '#f00'
					: '#fff';
				
				stg.Canvas.text({
					ctx: ctx,
					message: options[option],
					x: (ctx.canvas.width / 2) - 100,
					y: (ctx.canvas.height / 3) + option * menu_spacing,
					color: color,
					font: '30px arial'
				});
			}
			
			game.ctx.drawImage(ctx.canvas, 40, 20);
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			
		}
		
		/*
		 * Return the state.
		 */
		this.getState = function() {
			return state;
		};
		
		return this.getState();
	}
	
	return Pause;
}(window, FSM, STG, Resource, MIDI));