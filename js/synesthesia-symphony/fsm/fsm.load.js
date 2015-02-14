/*
 * @description - Load state.
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
 * Loads resources.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System module.
 * @param {MIDI} midi - MIDI.js library.
 * @param {Resource} resource - Resource module.
 * @param {Canvas} canvas - Canvas module.
 * @return {Function}
 */
FSM.Load = (function(globals, fsm, stg, system, midi, resource, canvas) {
	'use strict';
	
	/*
	 * Load state.
	 * @param {FSM} options.state - An FSM state. 
	 * @return {Undefined}
	 */
	function Load(options) {
		var state = new fsm.State(options.state || {});
		var background_color = new STG.Color(0, 0, 0, 1);
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined} 
		 */
		state.start = function(game) {
			//An array of MIDI instrument IDs.
			var instruments = stg.Audio.loadAllInstruments(resource.songs);
			
			//The MIDI.js loader widget shows the progress of the MIDI loader plugin.
			midi.loader = new widgets.Loader;
			
			//Load the intro music.
			midi.loadPlugin({
				targetFormat: 'mp3',
				soundfontUrl: './soundfont/',
				instruments: system.Config.PIANO_ONLY ? ['acoustic_grand_piano'] : instruments,
				callback: function() {
					//Set the volume.
					midi.setVolume(0, system.Config.bgm_volume);
					
					//The speed the songs are played.
					midi.Player.timeWarp = 1;
					
					//Remove the loading widget.
					midi.loader.stop();
					
					//Transition to the intro state.
					game.fsm.transition({
						state: new fsm.Intro({}).getState(),
						ctx: game.ctx
					});
				}
			});
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
		};
		
		/*
		 * Return the state.
		 * @return {FSM.State} - An FSM state.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Load;
}(window, FSM, STG, System, MIDI, Resource, Canvas));