/*
 *	@description - Finite state machine.
 *	@copyright - 2014 Shipping Soon
 *	@source - https://github.com/shippingsoon/Finite-State-Machine/
 *	@website - https://www.shippingsoon.com/synesthesia-symphony/
 *	@version - v0.05
 *	@license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var System = System || {};

/*
 * Intro state.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System submodule.
 * @param {MIDI} midi - MIDI.js library.
 * @return {FSM.Intro}
 */
FSM.Intro = (function(fsm, stg, system, midi, resource) {
	"use strict";
	
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
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined} 
		 */
		state.start = function(game) {
			//Map the MIDI channels to a numerical MIDI instrument ID.
			//http://en.wikipedia.org/wiki/General_MIDI#Program_change_events
			var channels = {
				0: 114, 1: 37,
				2: 39, 3: 76,
				4: 62, 5: 63,
				6: 80, 7: 88,
				8: 79, 9: 0,
				10: 81
			};
			
			//An array of MIDI instrument IDs.
			var instruments = stg.Audio.loadInstruments(channels);
				
			//Show the loading gif.
			resource.loading_gif.style.display = 'block';
			
			//Load the intro music.
			midi.loadPlugin({
				soundfontUrl: './soundfont/',
				instruments: instruments,
				callback: function() {
					//Hide the loading gif.
					resource.loading_gif.style.display = 'none';
					
					//Set the volume.
					midi.setVolume(0, system.Config.volume);
					
					//The speed the song is played back.
					mplayer.timeWarp = 1;
					
					//Load and play the intro music.
					mplayer.loadFile('/synesthesia-symphony/midi/intro.mid', mplayer.start);
					
					//Create a fade out effect by incrementing the background color.
					interval = setInterval(function() {
						if (hue <= 255) {
							//Increment the color from black to white.
							hue += 1;
							
							//Increase the font's size.
							font_size += 0.3;
						}
					}, 60);
			
					//MIDI event listener.
					mplayer.addListener(function (data) {
						//Map the MIDI channel to an instrument.
						for (var channel in channels)
							midi.programChange(channel, channels[channel]);
						
						//Once the fade out is complete transition to the Menu state.
						if (hue >= 255 || Keydown.z || Keydown.space) {
							//Stop the intro music.
							if (mplayer.playing) {
								mplayer.stop();

								//Transition into the Menu state.
								game.fsm.transition({
									state: new fsm.Stage({}).getState(),
									ctx: game.ctx
								});
							}
						}
					});
				}
			});
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {
			//Stop the MIDI event listener.
			mplayer.removeListener();
			
			//Clear the interval.
			if (interval !== null)
				clearInterval(interval);
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
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			//Draw the background.
			stg.Canvas.square({
				ctx: game.ctx,
				color: background_color,
				x: 0,
				y: 0,
				width: game.ctx.canvas.width,
				height: game.ctx.canvas.height
			});
			
			//Draw the company title.
			stg.Canvas.text({
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
}(FSM, STG, System, MIDI, Resource));