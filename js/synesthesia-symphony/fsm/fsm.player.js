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

//Player singleton.
FSM.Player = (function(fsm, stg, system) {
	"use strict";
	
	//An instance of our player.
	var _instance;
	
	//Player constructor.
	function Player(options) {
		if (_instance)
			return _instance;
		else
			_instance = this;
		
		this.state = new fsm.State(options);
		var x = options.x || 0;
		var y = options.y || 0;
		var radius = options.radius || 6;
		var ctx = options.ctx || null;
		var color = options.color || 'blue';
		var velocity = options.color || 10;
		var that = this;
		this.lives = this.lives || system.Config.INITIAL_LIVES;
		
		//Set the player's position.
		this.setPosition = function(positions) {
			if (positions.x)
				x = positions.x;
			
			if (positions.y)
				y = positions.y;	
		};
		
		//Get the player's position.
		this.getPosition = function() {
			return {x: x, y: y};
		};
		
		//Set the player's radius.
		this.setRadius = function(r) {
			radius = r;
		};
		
		//Get the player's radius.
		this.getRadius = function() {
			return {radius: radius};
		};
		
		//Move the player relative to its current position.
		this.move = function(positions) {
			x += positions.x || 0;
			y += positions.y || 0;
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
			var speed = (!Keydown.shift) ? velocity : (velocity / 2);
			
			if (Keydown.up)
				that.move({y: -speed});
			if (Keydown.down)
				that.move({y: speed});
			if (Keydown.left)
				that.move({x: -speed});
			if (Keydown.right)
				that.move({x: speed});
		};
		
		
		this.state.update = function(game) {
			//console.log(that.state.ctx)
			movement();
			//console.log(game);
			for (var i = 0; i < 8; i++) {
				//var image_data = game.ctx.getImageData(x, y, 1, 1);
				//var data = image_data.data;
			}
		};
		
		//Draws the player.
		this.state.render = function(game) {
			if (ctx) {
				stg.Canvas.Circle({x: x, y: y, radius: radius, color: color, ctx: ctx, lineWidth: 1});
				
				
				stg.Canvas.Square({x: 20 + 5, y: 530 + 5, w: 10, h: 10, color: 'red', ctx: ctx, lineWidth: 1});
				stg.Canvas.Square({x: 20, y: 530, w: 10, h: 10, color: color, ctx: ctx, lineWidth: 1});
			}
		};
	};
	
	return Player;
}(FSM, STG, System));