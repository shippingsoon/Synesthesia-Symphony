/*
 * @description - Enemy submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Finite-State-Machine/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var Pattern = Pattern || {};
var System = System || {};
var Shape = Shape || {};

/*
 * Enemy submodule.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Pattern} pattern - Pattern submodule for generating bullet patterns.
 * @param {System} system - System submodule.
 * @param {Shape} shape - Shape submodule.
 * @param {Vector} vector - Vector submodule.
 * @param {System} resource - Resource submodule.
 * @return {Function}
 */
Character.Enemy = (function(fsm, stg, pattern, system, shape, vector, resource, character) {
	'use strict';
	
	/*
	 * Enemy constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.radius - The enemy's radius.
	 * @param {STG.Color|String} options.color - The enemy's color.
	 * @param {Number} options.life_points - The enemy's life points.
	 * @param {Number} options.hit_points - The enemy's hit points.
	 * @param {Object[]} options.patterns - An array of objects to define the enemy's bullet patterns.
	 * @param {Object[]} options.paths - An array of objects to define the STG paths the enemy will follow.
	 * @param {Object[]} options.items - An array of objects to define the items the enemy will drop.
	 * @param {Boolean} options.loop_points - Determines if we will loop through the points.
	 * @return {Character.Enemy}
	 */
	function Enemy(options) {
		//Call our parent's constructor.
		shape.Circle.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The enemy's state.
		var state = new fsm.State(options);
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || this.getContext();
		
		//Options for bullet patterns.
		var patterns = options.patterns || [];
		
		//An array of points.
		var paths = options.paths || [];
		
		//An array of items.
		var items = options.items || [];
		
		//Stores the bullet patterns.
		var danmakus = [];
		
		//The route the enemy will follow.
		var route = null;
		
		//The enemy's lives.
		var life_points = options.life_points || 1;
		
		//The enemy's hit points and initial hit points.
		var hit_points = options.hit_points || 10;
		var initial_hit_points = options.hit_points || 10;
		
		//Player.
		var player = new character.Player();
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
			var ctx = that.getContext();
			var points = [];
			
			//Determines if we will loop through the points.
			var loop_points = options.loop_points || false;
		
			//Set the bullet patterns.
			for (var path = 0, length = patterns.length; path < length; path++) {
				patterns[path].target_type = stg.targets.player;
				
				danmakus.push(new pattern.Create(patterns[path]));
				
				state.setSubstate({
					substate: danmakus[path].getState(), 
					parent: that
				});
			}
			
			//If a path was given.
			if (paths) {
				for (var path = 0, length = paths.length; path < length; path++)
					points.push(new shape.Point(paths[path]));
				
				//Set the route.
				route = new stg.Path({points: points, loop_points: loop_points, parent: that});
				
				state.setSubstate({substate: route.getState(), parent: that});
			}
		};
		
		/*
		 * The enemy's logic.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			if (stg.Math.circleCollision(that, player))
				that.handleCollision(player, stg.targets.player);

		};
		
		/*
		 * Draws the enemy.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @paaram {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			if (ctx)
				that.draw({ctx:ctx});
		};
		
		/*
		 * Set the enemy's lives.
		 * @param {Number} lp - The life points to set.
		 * @param {Boolean} is_relative - Set the life points relative to its current value.
		 * @return {Character.Enemy}
		 */
		this.setLifePoints = function(lp, is_relative) {
			if (is_relative)
				life_points += lp;
			else
				life_points = _lp;
			
			//If there are no more life points destroy this object.
			if (life_points < 1) {
				state.setAlive(false);
			}

			return that;
		};

		/*
		 * Set the enemy's health.
		 * @param {Number} hp - The health to set.
		 * @param {Boolean} is_relative - Set the health points relative to its current value.
		 * @return {Character.Enemy}
		 */
		this.setHitPoints = function(hp, is_relative) {
			if (is_relative)
				hit_points += hp;
			else
				hit_points = hp;
			
			//If there are no more hit points decrease the life points and reset the hit points.
			if (hit_points < 0) {
				that.setLifePoints(-1, true);
				hit_points = initial_hit_points;
			}
			
			return that;
		};
		
		/*
		 * Get the enemy's lives.
		 * @return {Number}
		 */
		this.getLives = function() {
			return lives;
		};
		
		/*
		 * Move the enemy towards a target. Returns true or false depending on if the target is reached.
		 * @param {Shape.Point|Object} options.target - The STG point or object we will approach.
		 * @param {Number} options.speed - The rate in which the enemy will move towards the target.
		 * @return {Boolean}
		 */
		this.approach = function(options) {
			//The enemy's position.
			var position = that.getPosition();
			
			//The target we will try to approach.
			var target = options.target || {x: 0, y: 0};
			
			if (target.getPoint)
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
		 * Handles collision.
		 * @param {Character.player|STG.bullet} target - The target the enemy is colliding with.
		 * @param {Number|STG.targets} target_type - The type of target the enemy is colliding with.
		 * @return {Undefined}
		 */
		this.handleCollision = function(target, target_type) {
			switch (target_type) {
				//If the target is a player.
				case stg.targets.player:
					//Handle collision for the player.
					target.handleCollision(that, stg.targets.enemy);
					break;
					
				//If the target is a bullet.
				case stg.targets.bullet:
					//Decrease the enemy's hit points.
					that.setHitPoints(-1, true);
					
					//Increase the score.
					system.score += 100;
					break;
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
	
	Enemy.prototype = Object.create(shape.Circle.prototype);
	
	return Enemy;
}(FSM, STG, Pattern, System, Shape, Vector, Resource, Character));
