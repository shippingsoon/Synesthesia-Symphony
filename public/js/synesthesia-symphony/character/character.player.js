/*
 * @description - Player submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var System = System || {};
var Resource = Resource || {};
var Pattern = Pattern || {};
var Shape = Shape || {};

/*
 * Player singleton.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {STG} stg - Miscellaneous game module.
 * @param {System} system - System module.
 * @param {Object} resource - Resource module.
 * @param {Object} pattern - Pattern module.
 * @param {Shape} shape - Shape module.
 * @param {Vector} vector - Vector module.
 * @return {Function}
 */
Character.Player = (function(globals, fsm, stg, system, resource, pattern, shape, vector) {
	'use strict';
	
	//An instance of our player.
	var _instance;
	var config = system.Config;
	var protagonist = Character.protagonist;
	var player_idx = protagonist.player_idx;
	var weapon_idx = protagonist.weapon_idx;
	var weapons = protagonist.weapons;
	var layers = resource.layers;
	
	/*
	 * Player constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.radius - The player's radius.
	 * @param {STG.Color[]} options.colors - An array of colors for the player's primary and secondary colors.
	 * @param {Number} options.lives - The player's initial lives.
	 * @param {Number} options.power - The player's initial power.
	 * @param {Object[]} options.patterns - An array of bullet patterns.
	 * @param {Number} options.target_type - The target type. Set to 0 to retrieve the player and 1 to retrieve enemies.
	 * @return {Character.player}
	 */
	function Player(options) {
		if (_instance)
			return _instance;
		else
			_instance = this;
		
		//The player's radius.
		options.radius = options.radius || config.PLAYER.HITBOX_RADIUS;
		
		//Invoke the inherited constructor.
		shape.Circle.call(this, options);
		
		//The player's state.
		var state = new fsm.State(options);
		
		//A reference to the current object.
		var that = this;
		
		//The velocity vector.
		var velocity = new vector({});
		
		//The player's primary and secondary colors.
		var colors = options.colors || weapons.colors[player_idx][weapon_idx];
		
		//Set the player's primary color.
		this.setColor(colors[0]);
		
		//If the color index is 0 then the player is using their primary color, if it is set to 1 they are using a secondary color.
		var color_idx = 0;
		
		//The player's speed.
		var speed = options.speed || config.PLAYER.SPEED;
		
		//The player's focused speed.
		var focused_speed = options.focused_speed || config.PLAYER.FOCUS_SPEED;
		
		//The player's lives.
		var lives = options.lives || config.PLAYER.INITIAL_LIVES;
		
		//The player's power. This will determine the player's rate of fire.
		var power = options.power || config.PLAYER.INITIAL_POWER;
		
		//Options for bullet patterns.
		var patterns = options.patterns || [];
		
		//Stores the player's bullet patterns.
		var danmakus = [];
		
		//The color boxes.
		var color_boxes = [];
		
		//Determines if the player is invulnerable.
		var is_invulnerable = false;
		
		//If the player has glazed a bullet.
		var has_glazed = false;
		
		var invulnerableTimer = null;
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
			var ctx = that.getContext();
			
			color_boxes.push(new shape.Square({x: 10 + 4, y: 540 + 4, w: 8, h: 8, ctx: ctx, lineWidth: 1}));
			color_boxes.push(new shape.Square({x: 10, y: 540, w: 8, h: 8, ctx: ctx, lineWidth: 1}));
			
			for (var index = 0, length = patterns.length; index < length; index++) {
				patterns[index].target_type = options.target_type || stg.targets.enemy;
				danmakus.push(new pattern.Create(patterns[index]));
				
				state.setSubstate({
					substate: danmakus[index].getState(), 
					parent: that
				});
			}
			
			//Create a time out for the player's invulnerability status.
			invulnerableTimer = new stg.Timer(that.setInvulnerable, config.PLAYER.INVULNERABILITY_TIMEOUT, false);
		};
		
		/*
		 * Stop the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.stop = function(game) {
			invulnerableTimer.stop();
		};
		
		/*
		 * The player's logic.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			//Handle the player's movement.
			movement(game);
			
			if (lives < 1) {
				//If debug mode is enabled reset the player's lives.
				if (system.Config.DEBUG_MODE)
					that.setLives(5);
				
				//Transition to Game Over state.
				else
					game.fsm.forward({state: new fsm.Gameover({}).getState(), ctx: game.ctx});
			}
		};
		
		/*
		 * Draws the player.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.render = function(game) {
			var ctx = that.getContext();
			var random = 0.1 + (Math.random() * (0.4 - 0.1));
			
			//colors[color_idx].setAlpha(((is_invulnerable) ? random : 1));
			for (var color in colors)
				colors[color].setAlpha(((is_invulnerable) ? random : 1));
			
			if (ctx) {
				//Draw the player.
				that.draw({ctx: ctx, color: colors[is_invulnerable ? random : color_idx]});
				
				//Draw the player's color boxes.
				if (!stg.Math.circleSquareCollision(that, color_boxes[0]))
					color_boxes[0].draw({color: colors[color_idx === 0 ? 1 : 0]});
				
				if (!stg.Math.circleSquareCollision(that, color_boxes[1]))
					color_boxes[1].draw({color: colors[color_idx === 0 ? 0 : 1]});
			}
		};
		
		/*
		 * Pause the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.pause = function(game) {
			invulnerableTimer.pause();
		};
		
		/*
		 * Resume the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.play = function(game) {
			invulnerableTimer.play();
		};
		
		/*
		 * Set the player's lives.
		 * @param {Number} _lives - The lives to set.
		 * @return {Undefined}
		 */
		this.setLives = function(_lives) {
			lives = _lives;
		};
		
		/*
		 * Get the player's lives.
		 * @return {Number}
		 */
		this.getLives = function() {
			return lives;
		};
		
		/*
		 * Set the player's power.
		 * @param {Number} _power - The player's power.
		 * @return {Undefined}
		 */
		this.setPower = function(_power) {
			power = _power;
		};
		
		/*
		 * Get the player's power.
		 * @return {Number}
		 */
		this.getPower = function() {
			return power;
		};
		
		/*
		 * Set the player's colors or optionally sets the player's color at a given index.
		 * @param {STG.Color|String} _color - The new color.
		 * @param {Number} _color_idx - The array index.
		 * @param {Boolean} use_current - Determines if we will set the player's current color.
		 * @return {Undefined}
		 */
		this.setColors = function(_color, _color_idx, use_current) {
			if (use_current)
				_color_idx = color_idx;
			
			if (_color_idx && _color_idx < colors.length)
				colors[_color_idx] = _color;
			else
				colors = _color;
		};
		
		/*
		 * Get the player's primary and secondary colors or get the player's color at a given index.
		 * @param {Number} _color_idx - The color index.
		 * @param {Boolean} use_current - Determines if we will set the player's current color.
		 * @return {STG.Color|String}
		 */
		this.getColors = function(_color_idx, use_current) {
			if (use_current)
				_color_idx = color_idx;
				
			if (_color_idx && _color_idx < colors.length)
				return colors[_color_idx];
			
			return colors;
		};
		
		/*
		 * Set the player's invulnerability status.
		 * @param {Boolean} _is_invulnerable - Detemines if the player is invulnerable.
		 * @return {Undefined}
		 */
		this.setInvulnerable = function(_is_invulnerable) {
			is_invulnerable = _is_invulnerable;
		};
		
		/*
		 * Get the player's invulnerability status.
		 * @return {Boolean}
		 */
		this.getInvulnerable = this.isInvulnerable = function() {
			return is_invulnerable;
		};
		
		/*
		 * Handles collision.
		 * @param {Number} target - The object we have collided with.
		 * @param {Number} target_type - The type of collision. 0 is for players, 1 is for enemies, 2 is for bullets.
		 * @return {Boolean}
		 */
		this.handleCollision = function(target, target_type) {
			//Determines if the collision is valid.
			var has_collided = false;
			
			switch (target_type) {
				//If we have collided with an enemy.
				case stg.targets.enemy:
					has_collided = true;
					
					break;
				
				//If we have collided with a bullet.
				case stg.targets.bullet:
					//Check for color collision.
					has_collided = !stg.Cmath.compareColor(colors[color_idx].getColor(), target.getColor());
					
					//If the player has glazed a friendly colored bullet.
					if (!has_collided && !has_glazed) {
						has_glazed = true;
						
						//Set a timeout to prevent the player from being able to gain too much glaze points.
						setTimeout(function() {
							system.glaze++;
							system.score += 10;
							has_glazed = false;
						}, 200);
					}
					
					break;
				
				case stg.targets.item:
					
					break;
			}
			
			if (has_collided) {
				//Clear the bullets.
				for (var bullet in resource.bullets)
					resource.bullets[bullet].getState().setAlive(false);
				resource.bullets = [];
				
				//Clear the enemies.
				for (var enemy in resource.enemies)
					resource.enemies[enemy].getState().setAlive(false);
				resource.enemies = [];
					
				//Play a SFX.
				stg.Audio.playSfx(0, 89, 127, 0);
				
				//Decrease the player's lives.
				that.setLives(that.getLives() - 1);
				
				//Make the player temporarily invulnerable.
				that.setInvulnerable(true);
				invulnerableTimer.setDelay(config.PLAYER.INVULNERABILITY_TIMEOUT).play();
			}
			
			return has_collided;
		}

		/*
		 * Move the player.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		function movement(game) {
			var _speed = speed;
			var position = that.getPosition();
			var canvas = layers.buffer.getSquare();
			
			//If the Shift key is pressed switch to focused movement.
			if (Keydown.shift) {
				_speed = focused_speed;
				color_idx = 1;
			}
			else
				color_idx = 0;
			
			//The Up key has been pressed.
			if ((Keydown.up || Keydown.w) && (position.y - _speed) > 0)
				that.add({x: 0, y: -_speed});
				
			//The Down key has been pressed.
			if ((Keydown.down || Keydown.s) && (position.y + _speed) < canvas.height)
				that.add({x: 0, y: _speed});
			
			//The Left key is pressed.
			if ((Keydown.left || Keydown.a) && (position.x - _speed) > 0)
				that.add({x: -_speed, y: 0});
			
			//The Right key has been pressed.
			if ((Keydown.right || Keydown.d) && (position.x + _speed) < canvas.width)
				that.add({x: _speed, y: 0});
			
			for (var danmaku = 0, length = danmakus.length; danmaku < length; danmaku++) {
				danmakus[danmaku].setAutoFire(Keydown.z);
				danmakus[danmaku].setColors([colors[color_idx]]);
			}
		};
		
		/*
		 * Get the state.
		 * @return {STG.State}
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Player.prototype = Object.create(shape.Circle.prototype);
	
	return Player;
}(window, FSM, STG, System, Resource, Pattern, Shape, Vector));