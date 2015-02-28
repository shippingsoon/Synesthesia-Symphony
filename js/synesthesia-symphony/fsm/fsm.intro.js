/*
 * @description - Finite state machine.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Finite-State-Machine/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var System = System || {};
var MIDI = MIDI || {};
var Resource = Resource || {};

/*
 * Intro state.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System module.
 * @param {MIDI} midi - MIDI.js library.
 * @return {FSM.Intro}
 */
FSM.Intro = (function(globals, fsm, stg, system, midi, resource, canvas) {
	'use strict';
	
	/*
	 * Intro state.
	 * @param {FSM} options.state - An FSM state. 
	 * @return {Undefined}
	 */
	function Intro(options) {
		var state = new fsm.State(options.state || {});
		var background_color = new STG.Color(0, 0, 0, 1);
		var hue = 0;
		var font_size = 1;
		var mplayer = midi.Player;
		var interval = null;
		var songs = resource.songs;
		var can_keypress = true;
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined} 
		 */
		state.start = state.play = function(game) {
			can_keypress = false;
			hue = 0;
			font_size = 1;
			
			//Handle events for this state.
			globals.addEventListener('keyup', game.fsm.controller, false);
					
			//Create a fade out effect by incrementing the background color.
			interval = setInterval(function() {
				if (hue <= 255) {
					//Increment the color from black to white.
					hue += 1;
					
					//Increase the font's size.
					font_size += 0.3;
				}
			}, 60);
			
			//Play a MIDI song.
			stg.Audio.playSong({
				song: songs['intro']
			});
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = state.pause = function(game) {
			//Stop the music.
			if (mplayer.playing)
				mplayer.stop();
			
			//Remove the event.
			globals.removeEventListener('keyup', game.fsm.controller, false);
			
			//Clear the interval.
			if (interval !== null) {
				clearInterval(interval);
				interval = null;
			}
		};
		
		/*
		 * Handle events for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @param {Number} game.event - Numeric event code.
		 * @return {Undefined}
		 */
		state.controller = function(game) {
			if (can_keypress) {
				switch (game.event.keyCode) {
					//Z, Enter, Space or Escape key is pressed.
					case 90:
					case 32:
					case 13:
					case 27:
						//Transition into the Menu state.
						game.fsm.forward({
							state: new fsm.Menu({}).getState(),
							ctx: game.ctx
						});
						
						break;
				}
				
				can_keypress = false;
			}
		};
		
		/*
		 * Handle logic of this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			//Change the background color.
			if (hue <= 255)
				background_color.setColor({red: hue, green: hue, blue: hue});
			else
				//Transition into the Menu state.
				game.fsm.forward({
					state: new fsm.Menu({}).getState(),
					ctx: game.ctx
				});
			
			if (!can_keypress) {
				setTimeout(function() {
					can_keypress = true;
				}, 400);
			}
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			//Draw the background.
			canvas.square({
				ctx: game.ctx,
				color: background_color,
				x: 0,
				y: 0,
				width: game.ctx.canvas.width,
				height: game.ctx.canvas.height
			});
			
			//Draw the company title.
			canvas.text({
				ctx: game.ctx,
				x: game.ctx.canvas.width / 2,
				y: (game.ctx.canvas.height / 2) - 20,
				message: system.Config.COMPANY,
				color: 'black',
				font: font_size + 'px Open Sans',
				align: 'center',
			});
		};
		
		/*
		 * Return the state.
		 * @return {FSM.State} - An FSM state.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Intro;
}(window, FSM, STG, System, MIDI, Resource, Canvas));