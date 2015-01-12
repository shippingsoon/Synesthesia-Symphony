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
	 * @param {Boolean} options.loop_points - Determines if we will loop through the points.
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
		
		//An array of STG points.
		var points = options.paths || [];
		
		//Determines if we will loop through the points.
		var loop_points = options.loop_points || false;
		
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
			path = new stg.Path({points: points, loop_points: loop_points, parent: that});
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
		 * Move the enemy towards a target. Returns true or false depending on if the target is reached.
		 * @param {STG.Point|Object} options.target - The STG point or object we will approach.
		 * @param {Number} options.speed - The rate in which the enemy will move towards the target.
		 */
		this.approach = function(options) {
			//The enemy's position.
			var position = that.getPosition();
			
			//The target we will try to approach.
			var target = options.target || {x: 0, y: 0};
			
			if (target.hasOwnProperty('getPosition'))
				target = target.getPoint();
			
			//The rate in which the enemy will move towards the target.
			var speed = options.speed || 0;
			
			//The distance between the vector and the target.
			var distance = stg.Math.distance(this, target);
			
			//Get the angle that the enemy needs to travel in to reach the target.
			var angle = stg.Math.getTargetAngle(target, this);
			
			//If the distance between the enemy and the target is smaller than the target's radius, advance our position.
			if (distance < target.radius)
				return true;
			
			//Adjust the enemy's speed if it is moving at a rate that would skip over the target.
			if ((distance + target.radius) < (speed * 2))
				speed = distance;
			
			//Move the enemy towards the target.
			this.add({
				x: speed * Math.cos(angle),
				y: speed * Math.sin(angle)
			});
			
			return false;
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