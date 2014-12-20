/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};

//Intro state.
FSM.Intro = (function(fsm) {
	"use strict";
	
	function Intro(options) {
		var state = new fsm.State(options);
		var shade = 0;
		
		/*
		 * Update the state.
		 * @param {Object||FSM} game - Pesky super object.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			//Once the fade out is complete transition to the menu state.
			if ((shade += 3) >= 255)
				game.fsm.transition(new fsm.Menu({}));
		};
		
		/*
		 * Render this state.
		 * @param {Object||FSM} game - Pesky super object.
		 * @param {CanvasRenderingContext2D} ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			//Create a fade out effect by incrementing the shade.
			game.ctx.fillStyle = "rgb("+shade+"," +shade+ "," +shade+ ")";
			game.ctx.fillRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
		};
		
		return state;
	}
	
	return Intro;
}(FSM));