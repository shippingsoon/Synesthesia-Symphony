/*
	@description - Bullet submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};
var System = System || {};

//Bullet submodule.
STG.Bullet = (function(fsm, stg, resource, system) {
	"use strict";
	
	var layers = resource.layers;
	 /*
	  * Bullet constructor.
	  * @param {Object} options.x - The x coordinate.
	  * @param {Object} options.y - The y coordinate.
	  * @param {Object} options.radius - The bullet's radius.
	  * @param {Object} options.magnitude - The bullet's magnitude.
	  * @param {Boolean} options.open - Determines if the bullet will leave a paint trail.
	  * @param {STG.Color|String} options.color - The bullet's color.
	  * @param {STG.Color|String} options.strokeStyle - The bullet's outline color.
	  * @param {Number} options.lineWidth - The bullet's outline width.
	  * @param {Boolean} options.is_open - Determines if the bullet will leave a paint trail.
	  * @param {Number} options.target - Set to 0 to retrieve the player and 1 to retrieve enemies.
	  */
	function Bullet(options) {
		//Call our parent's constructor.
		stg.Circle.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The bullet's state.
		var state = new fsm.State(options.state || {});
		
		//The bullet's velocity vector.
		this.velocity = new stg.Vector({
			x: options.vx || 0,
			y: options.vy || 0
		});
		
		//The bullet's magnitude.
		this.magnitude = options.magnitude || 1;
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || this.getContext().ctx;

		//Determines if the bullet will leave a paint trail.
		var is_open = (options.is_open !== undefined) ? options.is_open : false;
		
		//The target the bullet will collide with.
		var target = options.target || 0;
		
		//Set this state's parent.
		state.setParent(that);
		
		/*
		 * Draw the bullet.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			if (ctx)
				that.draw({ctx:ctx});
		};
		
		/*
		 * Update the bullet's location.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			var stage = game.fsm.getParent().parent;
			var out_of_bounds = false;
			var has_collided = false;
			
			//If this bullet is open create a paint trail.
			if (is_open) {
				var circle = that.getCircle();
				
				var paint_bullet = new stg.Bullet({
					ctx: ctx || game.ctx,
					x: circle.x,
					y: circle.y,
					radius: circle.radius,
					color: that.getColor().color,
					strokeStyle: that.getColor().color,
					vy: 5
				});
				
				game.fsm.setSubstate({substate: paint_bullet.getState()});
			}
			
			
			//Add the velocity vector to the bullet's position.
			that.add(that.velocity);
			
			if (stage) {
				var targets = stage.getTargets(target);
				
				//If our target is a player.
				if (target === 0) {
					if (has_collided = stg.Math.circleCollision(that, targets.player))
						targets.player.setLives(-1);
				}
				
				//If our target is enemies.
				else if (target === 1) {
					for (var enemy = 0; enemy < targets.enemies.length; enemy++) {
						
						if (has_collided = stg.Math.circleCollision(that, targets.enemies[enemy])) {
							targets.enemies[enemy].setLives(-1);
							system.Config.score += 100;
							break;
						}
					}
				}
			}
			/*
			*/
			
			out_of_bounds = stg.Math.outOfBounds(that, layers.buffer);
			state.setAlive(!out_of_bounds && !has_collided);
		};
		
		/*
		 * Get the state.
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Bullet.prototype = Object.create(stg.Circle.prototype);
	
	return Bullet;
}(FSM, STG, Resource, System));