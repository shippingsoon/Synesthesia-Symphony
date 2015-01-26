/*
	@description - Title menu state.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var Resource = Resource || {};
var STG = STG || {};
var System = System || {};

/*
 * The title menu state.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {Resource} resource - Resource submodule.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System submodule.
 * @param {MIDI} midi - MIDI.js library.
 * @return {FSM.Menu}
 */
FSM.Menu = (function(globals, fsm, resource, stg, system, midi) {
	"use strict";
	
	function Menu(options) {
		var state = new fsm.State(options.state || {});
		var options = ['Game Start', 'Extra Start', 'Music Room', 'Config', 'Quit'];
		var menu_spacing = 50;
		var menu_index = 0;
		var font_color = new stg.Color(0, 0, 0, 1);
		var sprites = resource.sprites;
		var mplayer = midi.Player;
		var songs = resource.songs;
		
		//The position vector for the two revolving background sprites.
		var bg_vectors = [
			new stg.Vector({x: 0, y: 0}),
			new stg.Vector({x: 0, y: -sprites.menu.img.height})
		];
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			//Show the loading gif.
			resource.loading_gif.style.display = 'block';

			
			//Map the MIDI channel to an instrument.
			stg.Audio.programChange(songs['fairy_mountain']);
						
			//Load and play the menu music.
			mplayer.loadFile(songs['fairy_mountain'].file, function(data) {
				//Hide the loading gif.
				resource.loading_gif.style.display = 'none';
				
				mplayer.start();
				
			});
			
			//Handle events for this state.
			globals.addEventListener('keydown', game.fsm.controller, false);

		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.stop = function(game) {
			//Stop the music.
			if (mplayer.playing)
				mplayer.stop();
			
			//Remove the event.
			globals.removeEventListener('keydown', game.fsm.controller, false);
		};
		
		/*
		 * Update this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			//This function moves the canvas sprite's position.
			stg.Stage.conveyorBelt(bg_vectors, sprites.menu.img.height, 1);
			
		};
		
		/*
		 * Handle events for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @param {Number} game.event - Numeric event code.
		 */
		state.controller = function(game) {
			switch (game.event.keyCode) {
				//Up key is pressed.
				case 38:
					//Play a SFX.
					midi.noteOn(0, 74, system.Config.sfx_volume, 0);
					
					//Move the menu index down.
					menu_index = (menu_index <= 0)
						? (options.length - 1)
						: (menu_index - 1);
					break;
				
				//Down key is pressed.
				case 40:
					//Play a SFX
					midi.noteOn(0, 74, system.Config.sfx_volume, 0);
					
					//Move the menu index up.
					menu_index = (menu_index == options.length - 1)
						? 0
						: (menu_index + 1); 
					break;
				
				//Z, Enter or Space key is pressed.
				case 90:
				case 32:
				case 13:
					//Transition to the stage state.
					if (menu_index === 0)
						game.fsm.transition({state: new fsm.Stage({}).getState()});
					else if (menu_index === options.length - 1)
						game.fsm.rewind({stop: true, ctx: game.ctx});
					break;
			}
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			//Draw the background image on the screen layer.
			game.ctx.drawImage(sprites.menu.img, 0, bg_vectors[0].getPosition().y);
			game.ctx.drawImage(sprites.menu.img, 0, bg_vectors[1].getPosition().y);
			
			//Draw the menu options.
			stg.Canvas.text({
				ctx: game.ctx,
				x: game.ctx.canvas.width / 2,
				y: game.ctx.canvas.height / 3,
				message: system.Config.TITLE,
				color: '#FFFACD',
				font: 'bold 45px Open Sans',
				shadowColor: 'black',
				shadowBlur: 2,
				shadowoffsetX: 3,
				shadowoffsetY: 3,
				align: 'center'
			});
				
			//Loop through the title menu options.
			for (var option = 0, length = options.length; option < length; option++) {
				//Change the font's color.
				(menu_index === options.indexOf(options[option]))
					? font_color.setColor(255, 215, 0, 1)
					: font_color.setColor(255, 255, 255, 1);
				
				//Draw the menu options.
				stg.Canvas.text({
					ctx: game.ctx,
					x: game.ctx.canvas.width / 2,
					y: (game.ctx.canvas.height / 2) + option * menu_spacing,
					message: options[option],
					color: font_color,
					font: 'bold 36px open sans',
					shadowColor: 'black', shadowBlur: 2,
					shadowoffsetX: 3, shadowoffsetY: 3,
					align: 'center'
				});
			}
		};
		
		/*
		 * Return the state.
		 */
		this.getState = function() {
			return state;
		};
	}
	
	return Menu;
}(window, FSM, Resource, STG, System, MIDI));