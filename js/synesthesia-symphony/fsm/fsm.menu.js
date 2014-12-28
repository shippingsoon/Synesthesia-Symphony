/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};

//Menu state.
FSM.Menu = (function(fsm) {
	"use strict";
	
	function Menu(options) {
		var state = new fsm.State(options);
		var options = ['Start', 'Config', 'Quit'];
		var menu_spacing = 50;
		var menu_index = 0;
		
		/*
		 * Initiate this state.
		 * @param {Object||FSM} game - Pesky super object.
		 */
		state.start = function(game) {
			//Set the font style of the menu options.
			game.ctx.font = 'bold 30px arial';
			game.ctx.textAlign = 'center';
			
			//Handle events for this state.
			window.addEventListener('keyup', game.fsm.controller, false);
		};
		
		/*
		 * Stop this state.
		 * @param {Object||FSM} game - Pesky super object.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 */
		state.stop = function(game) {
			//Remove the event.
			window.removeEventListener('keyup', game.fsm.controller, false);
		};
		
		/*
		 * Handle events for this state.
		 * @param {Object||FSM} game - Pesky super object.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 * @param {Number} event - Numeric event code.
		 */
		state.controller = function(game) {
			switch (game.event.keyCode) {
				//Up key is pressed.
				case 38:
					menu_index = (menu_index <= 0)
						? (options.length - 1)
						: (menu_index - 1);
					break;
				
				//Down key is pressed.
				case 40:
					menu_index = (menu_index == options.length - 1)
						? 0
						: (menu_index + 1); 
					break;
				
				//Z key is pressed.
				case 90:
					//Transition to the stage state.
					if (menu_index === 0) 
						game.fsm.transition(new FSM.Stage({}));
					break;
			}
		};
		
		/*
		 * Render this state.
		 * @param {Object||FSM} game
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			//Draw the menu options.
			for (var option = 0; option < options.length; option++) {
				game.ctx.fillStyle = (menu_index == options.indexOf(options[option]))
					? '#f00'
					: '#444';
				game.ctx.fillText(options[option], game.ctx.canvas.width / 2, 100 + option * menu_spacing);
			}
		};
		
		
		//Return an instance of this state.
		return state;
	}
	
	return Menu;
}(FSM || {}));