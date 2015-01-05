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

//Player singleton.
FSM.Player = (function(fsm, stg, system, resource) {
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
		this.state = new fsm.State(options);
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
		
		//The player's pattern.
		var pattern = null;
		
		//The color boxes.
		var color_boxes = [];
		
		/*
		 * Start the state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.start = function(game) {
			var ctx = that.getContext().ctx;
			
			color_boxes.push(new stg.Square({x: 10 + 4, y: 540 + 4, w: 8, h: 8, ctx: ctx, lineWidth: 1}));
			color_boxes.push(new stg.Square({x: 10, y: 540, w: 8, h: 8, ctx: ctx, lineWidth: 1}));
			
			that.state.setSubstate({
				substate: new stg.Pattern({ctx: ctx}), 
				parent: that
			});
		};
		
		/*
		 * The player's logic.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.update = function(game) {
			movement(game);
			//console.log("player", stg.Math.circleSquareCollision(that, layers.buffer));
		};
		
		/*
		 * Draws the player.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.render = function(game) {
			var ctx = that.getContext().ctx;
			
			if (ctx) {
				//Draw the player.
				that.draw({ctx: ctx, color: colors[color_idx]});
				
				//Draw the player's color boxes.
				if (!stg.Math.circleSquareCollision(that, color_boxes[0]))
					color_boxes[0].draw({color: colors[color_idx === 0 ? 1 : 0]});
				
				if (!stg.Math.circleSquareCollision(that, color_boxes[1]))
					color_boxes[1].draw({color: colors[color_idx === 0 ? 0 : 1]});
			}
		};
		
		//Set the player's lives.
		this.setLives = function(live) {
			lives = live;
		};
		
		//Get the player's lives.
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
		 * Move the player.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		function movement(game) {
			var s = speed;
			//If the Shift key is pressed switch to focused movement.
			if (Keydown.shift) {
				s = focused_speed;
				color_idx = 1;
			}
			else
				color_idx = 0;
			
			//The Up key has been pressed.
			if (Keydown.up /*&& (y - velocity) > 0*/)
				that.add({x: 0, y: -s});
				
			//The Down key has been pressed.
			if (Keydown.down /*&& (y + velocity) < layers.buffer.height*/)
				that.add({x: 0, y: s});
			
			//The Left key is pressed.
			if (Keydown.left /*&& (x - velocity) > 0*/)
				that.add({x: -s, y: 0});
			
			//The Right key has been pressed.
			if (Keydown.right /*&& (x + velocity) < layers.buffer.width*/)
				that.add({x: s, y: 0});
		};
	};
	
	Player.prototype = Object.create(stg.Circle.prototype);
	
	return Player;
}(FSM, STG, System, Resource));