/*
	@description - Bullet submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.03
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};

//Bullet submodule.
STG.Bullet = STG.Bullet || (function(fsm, stg) {
	"use strict";
	
	 /*
	  * Bullet constructor.
	  * @param {Object} options.x - The x coordinate.
	  * @param {Object} options.y - The y coordinate.
	  * @param {Object} options.radius - The bullet's radius.
	  * @param {Object||Boolean} options.open - Determines if the bullet will leave a paint trail.
	  * @param {STG.Color||String} options.color - The bullet's color.
	  * @param {STG.Color||String} options.strokeStyle - The bullet's outline color.
	  * @param {Number} options.lineWidth - The bullet's outline width.
	  */
	function Bullet(options) {
		//A reference to the current object.
		var that = this;
		
		//The bullet's state.
		this.state = new fsm.State(options.state || {});

		//The bullet's position vector.
		this.position = new stg.Vector({
			x: options.x || 0,
			y: options.y || 0
		});
		
		//The bullet's velocity vector.
		this.velocity = new stg.Vector({
			x: options.vx || 10,
			y: options.vy || 10
		});
		
		this.speed = 0;
		
		//The bullet's radius.
		var radius = options.radius || 10;
		var r = options.radius || 10;
		
		//The bullet's color.
		var color = options.color || new stg.Color(0, 255, 0, 1);
		
		//The bullet's outline color.
		var strokeStyle = options.strokeStyle || new stg.Color(0, 0, 0, 1);
		
		//The bullet's outline width.
		var lineWidth = (options.lineWidth !== undefined) ? options.lineWidth : 1;
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || null;

		this.state.setParent(that);
		
		//Draw the bullet.
		this.state.render = function(game) {
			var location = that.position.getPosition();
			stg.Canvas.circle({x: location.x, y: location.y, radius: radius, color: color, ctx: ctx, lineWidth: 1});
		};
		
		//Update the bullet's state.
		this.state.update = function(game) {
			var circle = {
				x: that.position.getPosition().x,
				y: that.position.getPosition().y,
				r: 10
			};
			
			var box = {
				x: 0,
				y: 0,
				w: game.ctx.canvas.width,
				h: game.ctx.canvas.height
			};

			that.state.setActive(stg.Math.circleSquareCollision(circle, box));
			
			//console.log("collision", stg.Math.circleSquareCollision(circle, box));
		};
		
		/*
		 * Set the bullet's radius.
		 * @param {Number} new_radius - The new radius.
		 */
		this.setRadius = function(new_radius) {
			radius = new_radius;
		};
		
		/*
		 * Get the bullet's radius.
		 */
		this.getRadius = function() {
			return {radius: radius};
		};
		
		/*
		 * Set the bullet's color.
		 * @param {Number} _color - The new color.
		 */
		this.setColor = function(new_color) {
			color = new_color;
		};
		
		/*
		 * Get the bullet's color.
		 */
		this.getColor = function() {
			return {color: color};
		};
	};
	
	return Bullet;
}(FSM, STG));