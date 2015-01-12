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
STG.Path = (function(globals, fsm, stg) {
	"use strict";
	
	 /*
	  * Path constructor.
	  * @param {STG.Point[]|Object[]} options.points - An array of STG points or objects.
	  * @param {FSM.Enemy} options.parent - An enemy or boss.
	  * @param {Boolean} options.loop_points - Determines if we will loop through the points.
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
		
		//A positive or negative value we will use to change the point index.
		var incrementor = 1;
		
		//Determines if we can move.
		var can_move = true;
		
		//Determines if we will loop through the points.
		var loop_points = options.loop_points || false;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			if (parent && points.length !== 0) {
				//The targeted point we will move towards.
				var target = points[point_idx];
				
				//Move the parent to the initial point.
				parent.setPosition(target);
				
				//Set a delay.
				setDelay(target);
				
				//Move to the next point.
				point_idx += incrementor;
			}
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {//console.log("hi", can_move, "point_idx", point_idx, "points.length", points.length);
			if (parent && can_move) {
				console.log("point_idx", point_idx);
				//If there are points to follow.
				if (point_idx < points.length && point_idx > -1) {
					
					var target = points[point_idx];
					var speed = target.getSpeed().speed;
					
					//Make the enemy approach the point.
					if (parent.approach({target: target, speed: speed})) {
						//Set a delay.
						setDelay(target);
						
						//Move to the next point.
						point_idx += incrementor;
					}
				}
				
				//If we want to loop the points.
				else if (loop_points) {
					//Change the sign of the incrementor.
					incrementor = (incrementor > 0) ? -1 : 1;
					
					//Move to the previous point.
					point_idx += incrementor;
				}
				
				//There are no more points to follow.
				else
					parent.getState().setAlive(false);
			}
		};
		
		/*
		 * Changes the move state.
		 * @param {Boolean} _can_move - Determines if we can move.
		 */
		function setMove(_can_move) {//console.log('can_move', _can_move)
			can_move = _can_move;
		}
		
		/*
		 * Set a delay.
		 * @param {STG.Point|Object} target - A point or object.
		 */
		function setDelay(target) {
			//The time in milliseconds the enemy will wait at this point.
			var delay = (target.hasOwnProperty('getDelay'))
				? target.getDelay().delay
				: target.delay;
			
			if (delay) {
				can_move = false;
				globals.setTimeout(setMove, delay, true);
			}
		}
		
		/*
		 * Get the state.
		 */
		this.getState = function() {
			return state;
		};
	};
	
	return Path;
}(window, FSM, STG));