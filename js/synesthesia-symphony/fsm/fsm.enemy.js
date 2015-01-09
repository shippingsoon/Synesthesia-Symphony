/*
	@description - Enemy submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};

/*
 * Enemy submodule.
 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
 * @param {Number} options.x - The x coordinate.
 * @param {Number} options.y - The y coordinate.
 * @param {Number} options.radius - The enemy's radius.
 * @param {String|STG.Color} options.color - The color.
 * @param {Number} options.lineWidth - The line width.
 * @param {String|STG.Color} options.strokeStyle - The outline color.
 */
FSM.Enemy = (function(fsm, stg) {
	"use strict";
	
	/*
	 * Enemy constructor.
	 */
	function Enemy(options) {
		//Call our parent's constructor.
		stg.Circle.call(this, options);
		
		//A reference to the current object.
		var that = this;
		
		//The enemy's state.
		this.state = new fsm.State(options);
		
		//The 2D drawing context we will use to render the bullet.
		var ctx = options.ctx || this.getContext().ctx;
		
		/*
		 * Draws the enemy.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.render = function(game) {
			if (ctx)
				that.draw({ctx:ctx});
		};
	};
	
	Enemy.prototype = Object.create(stg.Circle.prototype);
	
	return Enemy;
}(FSM, STG));