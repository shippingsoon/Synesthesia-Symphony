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

//Bullet submodule.
STG.Bullet = (function(fsm, stg, resource) {
	"use strict";
	
	var layers = resource.layers;
	 /*
	  * Bullet constructor.
	  * @param {Object} options.x - The x coordinate.
	  * @param {Object} options.y - The y coordinate.
	  * @param {Object} options.radius - The bullet's radius.
	  * @param {Boolean} options.open - Determines if the bullet will leave a paint trail.
	  * @param {STG.Color|String} options.color - The bullet's color.
	  * @param {STG.Color|String} options.strokeStyle - The bullet's outline color.
	  * @param {Number} options.lineWidth - The bullet's outline width.
	  */
	function Bullet(options) {
		//Call our parent's constructor.
		stg.Circle.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The bullet's state.
		this.state = new fsm.State(options.state || {});
		
		//The bullet's velocity vector.
		this.velocity = new stg.Vector({
			x: options.vx || 0,
			y: options.vy || 0
		});
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || this.getContext();

		//Set this state's parent.
		this.state.setParent(that);
		
		/*
		 * Draw the bullet.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.render = function(game) {
			
			if (ctx)
				that.draw({ctx:ctx});
		};
		
		/*
		 * Update the bullet's location.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.update = function(game) {
			//Add the velocity vector to the bullet's position.
			that.add(that.velocity);
			
			//var has_collided = stg.Math.circleSquareCollision(that, layers.buffer);
			//that.state.setActive(has_collided);
		};
	};
	
	Bullet.prototype = Object.create(stg.Circle.prototype);
	
	return Bullet;
}(FSM, STG, Resource));