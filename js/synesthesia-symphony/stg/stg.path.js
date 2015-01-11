/*
	@description - Path submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};

//The path submodule defines different paths enemies can take.
STG.Path = (function(fsm, stg) {
	"use strict";
	
	 /*
	  * Path constructor.
	  * @param {STG.Point[]|Object[]} options.points - An array of STG points or objects.
	  * @param {FSM.Enemy} options.parent - An enemy or boss.
	  */
	function Path(options) {
		//A reference to the current object.
		var that = this;
		
		//The 2D rendering context.
		var ctx = options.ctx || null;
		
		//The pattern's state.
		var state = new fsm.State(options);
		
		//The parent of this state.
		var parent = options.parent || state.getParent() || null;
		
		//The points.
		var points = options.points || [];
		
		//An index for the points.
		var point_idx = 0;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			if (parent && points.length !== 0) {
				//Move the parent to the initial point.
				parent.setPosition(points[point_idx++]);
			}
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			if (parent) {
				//If there are points to follow.
				if (point_idx < points.length) {
					//Make the enemy approach the point.
					if (parent.approach({target: points[point_idx], speed: 5}))
						point_idx++;
				}
				
				//There are no more points to follow.
				else
					parent.getState().setAlive(false);
			}
		};
		
		/*
		 * Get the state.
		 */
		this.getState = function() {
			return state;
		};
	};
	
	return Path;
}(FSM, STG));