/*
	@description - Enemy submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Pattern = Pattern || {};

/*
 * Enemy submodule.
 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
 * @param {Number} options.x - The x coordinate.
 * @param {Number} options.y - The y coordinate.
 * @param {Number} options.radius - The enemy's radius.
 * @param {String|STG.Color} options.color - The color.
 * @param {Number} options.lineWidth - The line width.
 * @param {String|STG.Color} options.strokeStyle - The outline color.
 */
FSM.Enemy = (function(fsm, stg, pattern) {
	"use strict";
	
	/*
	 * Enemy constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.radius - The enemy's radius.
	 * @param {STG.Color|String} options.color - The enemy's color.
	 * @param {Object[]} options.patterns - An array of bullet patterns.
	 * @param {STG.Point[]|Object[]} options.paths - An array of STG points or objects.
	 */
	function Enemy(options) {
		//Call our parent's constructor.
		stg.Circle.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The enemy's state.
		var state = new fsm.State(options);
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || this.getContext().ctx;
		
		//Options for bullet patterns.
		var patterns = options.patterns || [];
		
		//Stores the bullet patterns.
		var danmakus = [];
		
		//The path the enemy will follow.
		var path = null;
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			var ctx = that.getContext().ctx;
			
			//Set the bullet patterns.
			for (var index = 0, length = patterns.length; index < length; index++) {
				danmakus.push(new pattern.Create(patterns[index]));
				
				state.setSubstate({
					substate: danmakus[index].getState(), 
					parent: that
				});
			}
			
			//Set the paths.
			path = new stg.Path({points: options.paths, parent: that});
			state.setSubstate({substate: path.getState(), parent: that});
		};
		
		/*
		 * Draws the enemy.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			if (ctx)
				that.draw({ctx:ctx});
		};
		
		/*
		 * Get the state.
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Enemy.prototype = Object.create(stg.Circle.prototype);
	
	return Enemy;
}(FSM, STG, Pattern));