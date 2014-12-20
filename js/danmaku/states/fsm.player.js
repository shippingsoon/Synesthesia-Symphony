/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};

//Player singleton.
FSM.Player = (function(fsm, stg) {
	"use strict";
	
	//An instance of our player.
	var _instance;
	
	//Player constructor.
	function Player(options) {
		if (_instance)
			return _instance;
		else
			_instance = this;
		
		this.state = new fsm.State({});
		var x = options.x || 40;
		var y = options.y || 40;
		var radius = options.radius || 15;
		
		//var colors = {
			
		//};
		var color = options.color || 'blue';
		var velocity = 20;
		var that = this;
		
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
			var speed = (!Keydown.shift) ? velocity : (velocity / 3);
			
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
		
			movement();
			
			for (var i = 0; i < 8; i++) {
				var image_data = game.ctx.getImageData(x, y, 1, 1);
				var data = image_data.data;
			}
		};
		
		//Draws the player.
		this.state.render = function(game) {
			game.ctx.beginPath();
			game.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
			game.ctx.fillStyle = color;
			game.ctx.fill();
			game.ctx.lineWidth = 2;
			game.ctx.strokeStyle = 'black';
			game.ctx.stroke();
		};
	};
	
	return Player;
}(FSM, STG || {}));