/*
 * @description - Bullet submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};
var System = System || {};
var Shape = Shape || {};

/*
 * Bullet submodule.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Object} resource - Resource module.
 * @param {System} system - System module.
 * @param {Shape} shape - Shape module.
 * @param {Vector} vector - Vector module.
 * @return {Function}
 */
STG.Bullet = (function(fsm, stg, resource, system, shape, vector) {
	'use strict';
	
	 /*
	  * Bullet constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {Number} options.radius - The bullet's radius.
	  * @param {Number} options.magnitude - The bullet's magnitude.
	  * @param {STG.Color|String} options.color - The bullet's color.
	  * @param {STG.Color|String} options.strokeStyle - The bullet's outline color.
	  * @param {Number} options.lineWidth - The bullet's outline width.
	  * @param {Boolean} options.is_open - Determines if the bullet will leave a paint trail.
	  * @param {Number} options.target_type - The target type. Set to 0 to retrieve the player and 1 to retrieve enemies.
	  * @return {Function}
	  */
	function Bullet(options) {
		//Call our parent's constructor.
		shape.Circle.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The bullet's state.
		var state = new fsm.State(options.state || {});
		
		//The bullet's velocity vector.
		this.velocity = new vector({
			x: options.vx || 0,
			y: options.vy || 0
		});
		
		//The bullet's magnitude.
		this.magnitude = options.magnitude || 1;
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || this.getContext();

		//Determines if the bullet will leave a paint trail.
		var is_open = (options.is_open !== undefined) ? options.is_open : false;
		
		//The type of target the bullet will collide with.
		var target_type = options.target_type || 0;
		
		//Drawing layer.
		var layers = resource.layers;
		
		//The player.
		var player = Character.Player();
		
		//Set this state's parent.
		state.setParent(that);
		
		/*
		 * Stop the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {
			//Mark this state as dead.
			state.setAlive(false);
		};
		
		/*
		 * Update the bullet's location.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			var stage = game.fsm.getParent();
			var out_of_bounds = false;
			var has_collided = false;
			
			//If this bullet is open generate a paint trail.
			if (is_open)
				makePaintTrail({fsm: game.fsm, ctx: ctx || game.ctx});
			
			//Make sure the bullet is not out of bounds.
			out_of_bounds = stg.Math.outOfBounds(that, layers.buffer);
			
			//Check for collision between the bullet and objects.
			if (!out_of_bounds)
				has_collided = handleCollision(target_type);
			
			//Add the velocity vector to the bullet's position.
			that.add(that.velocity);
			
			//If the bullet has collided or went out of bounds mark it as collided.
			if (out_of_bounds || has_collided)
				state.setAlive(false);
		};
		
		/*
		 * Draw the bullet.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			if (ctx)
				that.draw({ctx:ctx});
		};
		
		/*
		 * Generates a paint trail.
		 * @param {FSM} options.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		function makePaintTrail(options) {
			var circle = that.getCircle();
			var color = that.getColor();
				
			var paint_bullet = new stg.Bullet({
				ctx: ctx || options.ctx,
				x: circle.x,
				y: circle.y,
				radius: circle.radius,
				color: color,
				strokeStyle: color,
				target_type: target_type,
				vy: system.canvas_scroll_rate
			});
			
			options.fsm.setSubstate({substate: paint_bullet.getState()});
		}
		
		/*
		 * Handles collision between bullets and objects.
		 * @param {Number} target_type - The type of object that is colliding.
		 * @return {Undefined}
		 */
		function handleCollision(target_type) {
			var has_collided = false;
			
			//If the target is a player.
			if (target_type === stg.targets.player && !player.isInvulnerable()) {
				if (stg.Math.circleCollision(that, player))
					has_collided = player.handleCollision(that, stg.targets.bullet);
			}
			
			//If the target is an enemy.
			else if (target_type === stg.targets.enemy) {
				for (var enemy = 0, length = resource.enemies.length; enemy < length; enemy++) {
					
					if (has_collided = stg.Math.circleCollision(that, resource.enemies[enemy])) {
						resource.enemies[enemy].handleCollision(that, stg.targets.bullet);
						break;
					}
				}
			}
			
			return has_collided;
		}
		
		/*
		 * Get the state.
		 * @return {FSM.State}
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Bullet.prototype = Object.create(shape.Circle.prototype);
	
	return Bullet;
}(FSM, STG, Resource, System, Shape, Vector));