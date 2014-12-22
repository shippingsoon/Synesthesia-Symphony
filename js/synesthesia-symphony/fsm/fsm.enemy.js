/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};

//Enemy.
FSM.Enemy = (function(fsm, stg) {
	"use strict";
	
	//Enemy constructor.
	function Enemy(options) {
		this.state = new fsm.State({});
		
		//The enemy's coordinates.
		var x = options.x || 140;
		var y = options.y || 40;
		var radius = options.radius || 4;
		var color = options.color || 'green';
		var that = this;
		var ctx = options.ctx || null;
		
		//Draws the enemy.
		this.state.render = function(game) {
			if (ctx) {
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = color;
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.strokeStyle = 'black';
				ctx.stroke();
			}
		};
		
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
		
		this.state.update = function() {
			var player = fsm.Player({});
			
			/*
			if (stg.circleCollision(that, player)) {
				if (color == player.getColor().color)
					console.log("foo");
				else
					console.log("bar");
			}
			*/
		};
	};
	
	return Enemy;
}(FSM, STG || {}));