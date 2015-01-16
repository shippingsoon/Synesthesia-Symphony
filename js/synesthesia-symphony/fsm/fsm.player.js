/*
	@description - Player submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var System = System || {};
var Resource = Resource || {};
var Pattern = Pattern || {};

//Player singleton.
FSM.Player = (function(globals, fsm, stg, system, resource, pattern) {
	"use strict";
	
	//An instance of our player.
	var _instance;
	var config = system.Config;
	var protagonist = stg.Character.protagonist;
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
	 * @param {Number} options.target - Set to 0 to retrieve the player and 1 to retrieve enemies.
	 */
	function Player(options) {
		if (_instance)
			return _instance;
		else
			_instance = this;
		
		//The player's radius.
		options.radius = options.radius || config.HITBOX_RADIUS;
		
		stg.Circle.call(this, options);
		
		//The player's state.
		var state = new fsm.State(options);
		
		//A reference to the current object.
		var that = this;
		
		//The velocity vector.
		var velocity = new stg.Vector({});
		
		//The player's primary and secondary colors.
		var colors = options.colors || weapons.colors[player_idx][weapon_idx];
		
		this.setColor(colors[0]);
		
		//If this color index is 0 then the player is using their primary color, if it is set to 1 they are using a secondary color.
		var color_idx = 0;
		
		//The player's speed.
		var speed = options.speed || config.PLAYER_SPEED;
		
		//The player's focused speed.
		var focused_speed = options.focused_speed || config.PLAYER_FOCUS_SPEED;
		
		//The player's lives.
		var lives = options.lives || config.INITIAL_LIVES;
		
		//The player's power.
		var power = options.power || config.INITIAL_POWER;
		
		//Options for bullet patterns.
		var patterns = options.patterns || [];
		
		//Stores the player's bullet patterns.
		var danmakus = [];
		
		//The color boxes.
		var color_boxes = [];
		
		//Determines if the player is invulnerable.
		var is_invulnerable = false;
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.start = function(game) {
			var ctx = that.getContext().ctx;
			
			color_boxes.push(new stg.Square({x: 10 + 4, y: 540 + 4, w: 8, h: 8, ctx: ctx, lineWidth: 1}));
			color_boxes.push(new stg.Square({x: 10, y: 540, w: 8, h: 8, ctx: ctx, lineWidth: 1}));
			
			for (var index = 0, length = patterns.length; index < length; index++) {
				patterns[index].target = options.target || 1;
				danmakus.push(new pattern.Create(patterns[index]));
				
				state.setSubstate({
					substate: danmakus[index].getState(), 
					parent: that
				});
			}
		};
		
		/*
		 * The player's logic.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.update = function(game) {
			movement(game);
			
			if (lives < 1)
				that.setLives(5);
		};
		
		/*
		 * Draws the player.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		state.render = function(game) {
			var ctx = that.getContext().ctx;
			var random = Math.floor((Math.random() * 2) + 0);
			
			if (ctx) {
				//Draw the player.
				that.draw({ctx: ctx, color: colors[((is_invulnerable) ? random : color_idx)]});
				
				//Draw the player's color boxes.
				if (!stg.Math.circleSquareCollision(that, color_boxes[0]))
					color_boxes[0].draw({color: colors[color_idx === 0 ? 1 : 0]});
				
				if (!stg.Math.circleSquareCollision(that, color_boxes[1]))
					color_boxes[1].draw({color: colors[color_idx === 0 ? 0 : 1]});
			}
		};
		
		/*
		 * Set the player's lives.
		 * @param {Number} _live - The lives to set.
		 */
		this.setLives = function(_live) {
			if (_live < 0) {
				if (!is_invulnerable) {
					lives += _live;
				
					//Make the player temporarily invulnerable.
					that.setInvulnerable(true);
					globals.setTimeout(that.setInvulnerable, 1000, false);
				}
			}
			else
				lives += _live;
		};
		
		/*
		 * Get the player's lives.
		 */
		this.getLives = function() {
			return {lives: lives};
		};
		
		//Set the player's power.
		this.setPower = function(p) {
			power = p;
		};
		
		//Get the player's power.
		this.getPower = function() {
			return {power: power};
		};
		
		//Set the player's color.
		this.setColors = function(c) {
			color = c;
		};
		
		//Get the player's colors.
		this.getColors = function(use_index) {
			if (use_index !== undefined)
				return {color: colors[color_idx]};
			
			return {colors: colors};
		};
		
		/*
		 * Set the player's invulnerability.
		 * @param {Boolean} _is_invulnerable - Detemines if the player is invulnerable.
		 */
		this.setInvulnerable = function(_is_invulnerable) {
			is_invulnerable = _is_invulnerable;
		};

		/*
		 * Move the player.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
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
		 */
		this.getState = function() {
			return state;
		};
	};
	
	Player.prototype = Object.create(stg.Circle.prototype);
	
	return Player;
}(window, FSM, STG, System, Resource, Pattern));