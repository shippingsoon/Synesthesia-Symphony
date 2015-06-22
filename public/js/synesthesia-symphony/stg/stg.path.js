/*
 * @description - Path submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Finite-State-Machine/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var Shape = Shape || {};

/*
 * The path submodule defines different paths enemies can take.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {Shape} shape - Shape module.
 * @return {Function}
 */
STG.Path = (function(globals, fsm, shape) {
	'use strict';
	
	 /*
	  * Path constructor.
	  * @param {Shape.Point[]|Object[]} options.points - An array of STG points or objects.
	  * @param {Character.Enemy} options.parent - An enemy or boss.
	  * @param {Boolean} options.loop_points - Determines if we will loop through the points.
	  * @return {Undefined}
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
		 * @return {Undefined}
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
		 * @return {Undefined}
		 */
		state.update = function(game) {
			if (parent && can_move) {
				//If there are points to follow.
				if (point_idx < points.length && point_idx > -1) {
					var target = points[point_idx];
					var speed = target.getSpeed();
					
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
		 * @return {Undefined}
		 */
		function setMove(_can_move) {//console.log('can_move', _can_move)
			can_move = _can_move;
		}
		
		/*
		 * Set a delay.
		 * @param {Shape.Point|Object} target - A point or object.
		 * @return {Undefined}
		 */
		function setDelay(target) {
			//The time in milliseconds the enemy will wait at this point.
			var delay = (target.hasOwnProperty('getDelay'))
				? target.getDelay()
				: target.delay;
			
			if (delay) {
				can_move = false;
				globals.setTimeout(setMove, delay, true);
			}
		}
		
		/*
		 * Get the state.
		 * @return {FSM.State}
		 */
		this.getState = function() {
			return state;
		};
	};
	
	return Path;
}(window, FSM, Shape));