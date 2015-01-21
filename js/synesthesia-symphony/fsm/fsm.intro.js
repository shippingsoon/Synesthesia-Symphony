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
var Resource = Resource || {};

/*
 * Intro state.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System submodule.
 * @param {Resource} resource - Resource submodule.
 * @param {MIDI} midi - MIDI.js library.
 * @return {FSM.State}
 */
FSM.Intro = (function(fsm, stg, system, resource, midi) {
	"use strict";
	
	/*
	 * Intro state.
	 * @param {FSM} options.state - An FSM state. 
	 * @return {FSM.State}
	 */
	function Intro(options) {
		var state = new fsm.State(options.state || {});
		var background_color = 0;
		var font_size = 1;
		var mplayer = midi.Player;
		var byId = midi.GeneralMIDI.byId;
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined} 
		 */
		state.start = function(game) {
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
				//instrument: 'acoustic_grand_piano',
				callback: function() {
					//The speed the song is played back.
					mplayer.timeWarp = 1;
					
					//Load and play the intro music.
					mplayer.loadFile('/synesthesia-symphony/midi/intro.mid', mplayer.start);
					
					//MIDI event listener.
					mplayer.addListener(function (data) {
						//Map the MIDI channel to an instrument.
						midi.programChange(0, 114);
						midi.programChange(1, 37);
						midi.programChange(2, 39);
						midi.programChange(3, 76);
						midi.programChange(4, 62);
						midi.programChange(10, 81);
						midi.programChange(5, 63);
						midi.programChange(6, 80);
						midi.programChange(7, 88);
						midi.programChange(8, 79);
						midi.programChange(9, 0);
						
						//Increase the font's size.
						font_size += 0.2;
						
						//Once the fade out is complete transition to the Menu state.
						if ((background_color += 0.5) >= 255 || Keydown.z || Keydown.space) {
							//Stop the intro music.
							if (mplayer.playing)
								mplayer.stop();
							
							//Transition into the Menu state.
							//*
							game.fsm.transition({
								state: new fsm.Stage({}),
								ctx: game.ctx
							});
							//*/
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
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			//Create a fade out effect by incrementing the background color.
			if (background_color <= 255)
				game.ctx.fillStyle = "rgb("+background_color+"," +background_color+ "," +background_color+ ")";
			
			//Change the background color.
			game.ctx.fillRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
			//console.log(stg)
			//Draw the company title.
			/*
			stg.Canvas.text({
				x: game.ctx.canvas.width / 2,
				y: (game.ctx.canvas.height / 2) - 30,
				message: system.Config.COMPANY,
				ctx: game.ctx,
				color: 'black',
				font: font_size + 'px arial', align: 'center',
			});
			*/
		};
		
		/*
		 * Return the state.
		 */
		this.getInstance = function() {
			return state;
		};
		
		return this.getInstance();
	}
	
	return Intro;
}(FSM, Resource, STG, System, MIDI));