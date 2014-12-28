/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
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
	
	//Player constructor.
	function Player(options) {
		if (_instance)
			return _instance;
		else
			_instance = this;
		
		//The player's state.
		this.state = new fsm.State(options);
		var that = this;
		
		//The 2D drawing context we will use to render the player.
		var ctx = options.ctx || null;
		
		//The player's coordinates.
		var position = new stg.Vector({
			x: options.x || 0,
			y: options.y || 0
		});
		
		//The velocity vector.
		var velocity = new stg.Vector({});
		
		var x = options.x || 0;
		var y = options.y || 0;
		
		//The player's radius.
		var radius = options.radius || config.HITBOX_RADIUS;
		
		//The player's primary and secondary colors.
		var colors = options.color || weapons.colors[player_idx][weapon_idx];
		
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
		
		//The player's logic.
		this.state.update = function(game) {
			movement();
		};
		
		//Draws the player.
		this.state.render = function(game) {
			if (ctx) {
				var x = position.getPosition().x;
				var y = position.getPosition().y;
				
				//Draw the player's hitbox.
				stg.Canvas.circle({x: x, y: y, radius: radius, color: colors[color_idx], ctx: ctx, lineWidth: 1});
				
				//Draw the player's color boxes.
				if (x > 60 || y < 530) {
					stg.Canvas.square({x: 10 + 4, y: 540 + 4, w: 8, h: 8, color: colors[color_idx === 0 ? 1 : 0], ctx: ctx, lineWidth: 1});
					stg.Canvas.square({x: 10, y: 540, w: 8, h: 8, color: colors[color_idx === 0 ? 0 : 1], ctx: ctx, lineWidth: 1});
				}
			}
		};
		
		//Set the player's radius.
		this.setRadius = function(r) {
			radius = r;
		};
		
		//Get the player's radius.
		this.getRadius = function() {
			return {radius: radius};
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
		this.setColor = function(c) {
			color = c;
		};
		
		//Get the player's color.
		this.getColor = function() {
			return {color: color};
		};
		
		//Move the player.
		function movement() {
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
				position.add({x: 0, y: -s});
				
			//The Down key has been pressed.
			if (Keydown.down /*&& (y + velocity) < layers.buffer.height*/)
				position.add({x: 0, y: s});
			
			//The Left key is pressed.
			if (Keydown.left /*&& (x - velocity) > 0*/)
				position.add({x: -s, y: 0});
			
			//The Right key has been pressed.
			if (Keydown.right /*&& (x + velocity) < layers.buffer.width*/)
				position.add({x: s, y: 0});
		};
		
	
	};
	
	return Player;
}(FSM, STG, System, Resource));