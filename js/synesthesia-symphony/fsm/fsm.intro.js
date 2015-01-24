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
 * @return {FSM.State}
 */
FSM.Intro = (function(fsm, stg, system, midi, resource) {
	"use strict";
	
	/*
	 * Intro state.
	 * @param {FSM} options.state - An FSM state. 
	 * @return {FSM.State}
	 */
	function Intro(options) {
		var state = new fsm.State(options.state || {});
		var background_color = new STG.Color(0, 0, 0, 1);
		var hue = 0;
		var font_size = 1;
		var mplayer = midi.Player;
		var byId = midi.GeneralMIDI.byId;
		var interval = null;
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined} 
		 */
		state.start = function(game) {
			//Show the loading gif.
			resource.loading_gif.style.display = 'block';
			
			//Load the intro music.
			MIDI.loadPlugin({
				soundfontUrl: './soundfont/',
				instruments: [
					byId[114].id, byId[37].id,
					byId[39].id, byId[76].id,
					byId[62].id, byId[81].id,
					byId[63].id, byId[80].id,
					byId[88].id, byId[79].id,
					byId[0].id
				],

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
						midi.programChange(0, 114);
						midi.programChange(1, 37);
						midi.programChange(2, 39);
						midi.programChange(3, 76);
						midi.programChange(4, 62);
						midi.programChange(5, 63);
						midi.programChange(6, 80);
						midi.programChange(7, 88);
						midi.programChange(8, 79);
						midi.programChange(9, 0);
						midi.programChange(10, 81);
						
						//Once the fade out is complete transition to the Menu state.
						if (hue >= 255 || Keydown.z || Keydown.space) {
							//Stop the intro music.
							if (mplayer.playing) {
								mplayer.stop();

								//Transition into the Menu state.
								game.fsm.transition({
									state: new fsm.Stage({}),
									ctx: game.ctx
								});
							}	
						}
					});
				}
			});
			
			//mplayer.removeListener();
			
			
			
		};
		
		function testMIDI() {
			console.log("test", 1);
			//Load the stage music.
			midi.loadPlugin({
				soundfontUrl: './soundfont/',
				instruments: [

					byId[33].id, byId[18].id,
					byId[94].id, byId[58].id,
					byId[60].id, byId[49].id,
					byId[15].id, byId[95].id,
					byId[116].id, byId[5].id,
					byId[78].id, byId[15].id
				],
				callback: function(data) {
					console.log("test", 2);
					//Change the program and patch.
					//http://en.wikipedia.org/wiki/General_MIDI#Program_change_events
					
					midi.programChange(0, 33); //Program (patch) change ::  Channel 0.  Patch 33 (Electric Bass(finger))
					midi.programChange(1, 18); //Program (patch) change ::  Channel 1.  Patch 18 (Rock Organ)
					midi.programChange(2, 18); //Program (patch) change ::  Channel 2.  Patch 18 (Rock Organ)
					midi.programChange(3, 94); //Program (patch) change ::  Channel 3.  Patch 94 (Pad 7 (halo))
					midi.programChange(4, 58); //Program (patch) change ::  Channel 4.  Patch 58 (Tuba)
					midi.programChange(5, 60); //Program (patch) change ::  Channel 5.  Patch 60 (French Horn)
					midi.programChange(6, 49); //Program (patch) change ::  Channel 6.  Patch 49 (String Ensemble 2)
					midi.programChange(7, 15); //Program (patch) change ::  Channel 7.  Patch 15 (Dulcimer)
					midi.programChange(8, 95); //Program (patch) change ::  Channel 8.  Patch 95 (Pad 8 (sweep))
					midi.programChange(9, 116);
					midi.programChange(10, 58); //Program (patch) change ::  Channel 10.  Patch 58 (Tuba)
					midi.programChange(11, 5); //Program (patch) change ::  Channel 11.  Patch 5 (Electric Piano 2)
					midi.programChange(12, 78); //Program (patch) change ::  Channel 12.  Patch 78 (Whistle)
					midi.programChange(13, 15); //Program (patch) change ::  Channel 13.  Patch 15 (Dulcimer)
					
					
					//Set the volume.
					midi.setVolume(0, system.Config.volume);
					
					//The speed the song is played back.
					mplayer.timeWarp = 1;
					
					//Load and play the stage music.
					mplayer.loadFile('/synesthesia-symphony/midi/sky-chase-zone.mid', mplayer.start);
					
					console.log("test", 3);
					//MIDI event listener.
					mplayer.addListener(function (data) {
						console.log("test", 4);
						var event = new CustomEvent('onNote-' + data.note, {'detail': data});
						window.dispatchEvent(event);
					});
				}
			});
			
			console.log("test", 5);
		};
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {console.log("bye")
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
		 * @return {FSM.State}
		 */
		this.getState = function() {
			return state;
		};
		
		return this.getState();
	}
	
	return Intro;
}(FSM, STG, System, MIDI, Resource));