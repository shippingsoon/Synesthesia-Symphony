/*
 * @description - Title menu state.
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
 * The title menu state.
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
FSM.Menu = (function(globals, fsm, resource, stg, system, midi, canvas, vector) {
	'use strict';
	
	/*
	 * The title menu state.
	 * @param {Object} options.state - FSM state.
	 * @return {Undefined}
	 */
	function Menu(options) {
		var state = new fsm.State(options.state || {});
		var options = [
			{title: 'Game Start', disabled: false, visible: true},
			{title: 'Extra Start', disabled: true, visible: true},
			{title: 'Music Room', disabled: false, visible: true},
			{title: 'Config', disabled: false, visible: true},
			{title: 'Quit', disabled: false, visible: true}
		];
		var menu_spacing = 50;
		var menu_index = 0;
		var font_color = new stg.Color(0, 0, 0, 1);
		var sprites = resource.sprites;
		var mplayer = midi.Player;
		var songs = resource.songs;
		var year = new Date().getFullYear();
		
		//The position vector for the two revolving background sprites.
		var bg_vectors = [
			new vector({x: 0, y: 0}),
			new vector({x: 0, y: -sprites.menu.img.height})
		];
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = state.play = function(game) {
			//Play a MIDI song.
			if (game.method === 'start') {
				stg.Audio.playSong({
					song: songs['fairy_mountain'],
					setAnimation: stg.Audio.replayer
				});
			}
			
			//Handle events for this state.
			globals.addEventListener('keydown', game.fsm.controller, false);
			
			//Find the first selectable menu option.
			for (menu_index = 0; menu_index < options.length; menu_index++) {
				if (!options[menu_index].disabled)
					break;
			}
			
			//Initialize the conveyor belt.
			stg.Stage.is_odd_belt = true;
		};
		
		/*
		 * Stop this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = state.pause = function(game) {
			//Stop the music.
			if (game.method === 'stop')
				stg.Audio.stopSong();
			
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
					//Play a SFX.
					stg.Audio.playSfx(0, 74, 127, 0);
					
					//Move the menu index down.
					menu_index = (menu_index <= 0)
						? (options.length - 1)
						: (menu_index - 1);
					
					//Skip disabled options.
					for (var skip = 0; options[menu_index].disabled && skip < options.length; skip++) {
						menu_index--;
						
						if (menu_index < 0)
							menu_index = options.length -1;
					}
						
					break;
				
				//Down key is pressed.
				case 40:
					//Play a SFX.
					stg.Audio.playSfx(0, 74, 127, 0);
					
					//Move the menu index up.
					menu_index = (menu_index === options.length - 1)
						? 0
						: (menu_index + 1);
					
					//Skip disabled options.
					for (var skip = 0; options[menu_index].disabled && skip < options.length; skip++) {
						if (menu_index === options.length - 1)
							menu_index = 0;
						
						menu_index++;
					}
					
					break;
				
				//X or Escape key is pressed.
				case 88:
				case 27:
					//Play a SFX.
					stg.Audio.playSfx(0, 77, 127, 0);
					
					//Quit the game.
					if (menu_index === options.length - 1)
						game.fsm.rewind({stop: true, ctx: game.ctx});
					
					//Bring the menu cursor to the Quit option.
					else
						menu_index = options.length - 1;
					break;
				
				//Z, Enter or Space key is pressed.
				case 90:
				case 32:
				case 13:
					//Play a SFX.
					stg.Audio.playSfx(0, 70, 127, 0);
					
					switch (menu_index) {
						//If Game Start option is selected.
						case 0:
							game.fsm.transition({state: new fsm.Stage({}).getState()});
							break;
						
						//If Extra Start option is selected.
						case 1:
							//game.fsm.transition({state: new fsm.Extra({}).getState()});
							break;
						
						//If Music Room option is selected.
						case 2:
							game.fsm.forward({state: new fsm.Music({}).getState(), ctx: game.ctx});
							break;
							
						//If Config option is selected.
						case 3:
							game.fsm.forward({state: new fsm.Config({}).getState(), ctx: game.ctx});
							break;
						
						//If Quit option is selected.
						case 4:
							game.fsm.rewind({stop: true, ctx: game.ctx});
							break;
					}
					
					break;
			}
		};
		
		/*
		 * Update this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			//This function moves the canvas sprite's position.
			stg.Stage.conveyorBelt(bg_vectors, sprites.menu.img.height, 1);
		};
		
		/*
		 * Render this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			//Draw the background image on the screen layer.
			game.ctx.drawImage(sprites.menu.img, 0, bg_vectors[0].getPosition().y);
			game.ctx.drawImage(sprites.menu.img, 0, bg_vectors[1].getPosition().y);
			
			//Draw the menu options.
			canvas.text({
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
				if (!options[option].disabled) {
					(menu_index === options.indexOf(options[option]))
						? font_color.setColor(255, 215, 0, 1)
						: font_color.setColor(255, 255, 255, 1);
				}
				
				//Change the color of disabled options.
				else
					font_color.setColor(160, 160, 160, 1);
				
				//Draw the menu options.
				canvas.text({
					ctx: game.ctx,
					x: game.ctx.canvas.width / 2,
					y: (game.ctx.canvas.height / 2) + option * menu_spacing,
					message: options[option].title,
					color: font_color,
					font: 'bold 36px open sans',
					shadowColor: 'black',
					shadowBlur: 2,
					shadowoffsetX: 3,
					shadowoffsetY: 3,
					align: 'center'
				});
				
				//Draw the company title.
				canvas.text({
					ctx: game.ctx,
					x: game.ctx.canvas.width - 10,
					y: game.ctx.canvas.height - 10,
					message: 'Copyright '+year+' | '+system.Config.COMPANY,
					color: '#c0c0c0',
					font: 'bold 12px open sans',
					shadowColor: 'black',
					shadowBlur: 2,
					shadowoffsetX: 3,
					shadowoffsetY: 3,
					align: 'right'
				});
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
	
	return Menu;
}(window, FSM, Resource, STG, System, MIDI, Canvas, Vector));