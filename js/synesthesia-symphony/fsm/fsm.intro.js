/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};
var Resource = Resource || {};
var STG = STG || {};

//Intro state.
FSM.Intro = (function(fsm, resource, stg) {
	"use strict";
	
	function Intro(options) {
		var state = new fsm.State(options);
		var background_color = 0;
		var font_size = 1;
		var player = MIDI.Player;
		
		/*
		 * Start the state.
		 * @param {Object||FSM} game.fsm - Pesky super object.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Load the intro music.
			MIDI.loadPlugin({
				soundfontUrl: './soundfont/',
				instrument: 'acoustic_grand_piano',
				callback: function() {
					//The speed the song is played back.
					player.timeWarp = 1;
					
					//Load and play the intro music.
					player.loadFile('/synesthesia-symphony/midi/intro.mid', player.start);
					
					//MIDI event listener.
					player.addListener(function (data) {
						//Increase the font's size.
						font_size += 0.2;
						
						//Once the fade out is complete transition to the Menu state.
						if ((background_color += 0.5) === 255 || Keydown.z || Keydown.space) {
							//Stop the intro music.
							if (player.playing)
								player.stop();
							
							//Transition into the Menu state.
							game.fsm.transition({state: new fsm.Stage({}), ctx: resource.layers.screen.ctx});
						}
					});
				}
			});
		};
		
		/*
		 * Render this state.
		 * @param {Object||FSM} game.fsm - Pesky super object.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			
			//Create a fade out effect by incrementing the background color.
			if (background_color <= 255)
				game.ctx.fillStyle = "rgb("+background_color+"," +background_color+ "," +background_color+ ")";
			game.ctx.fillRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
			
			//Draw the company title.
			stg.Canvas.Text({
				x: game.ctx.canvas.width / 2,
				y: (game.ctx.canvas.height / 2) - 30,
				message: 'Shipping Soon',
				ctx: game.ctx,
				color: 'black',
				font: font_size + 'px arial', align: 'center',
			});
		};
		
		return state;
	}
	
	return Intro;
}(FSM, Resource, STG));