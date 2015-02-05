/*
 *	@description - Synesthesia Symphony's HTML5 Canvas module
 *	@copyright - 2014 Shipping Soon
 *	@source - https://github.com/shippingsoon/Synesthesia-Symphony
 *	@website - https://www.shippingsoon.com/synesthesia-symphony/
 *	@version - v0.05
 *	@license - GPLv3
 */

/*
 * This module handles HTML5 Canvas related routines.
 * @return {Undefined}
 */
var Canvas = (function() {
	'use strict';
	
	return {
		/*
		 * Clears the canvas.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The canvas' x coordinate.
		 * @param {Number} options.y - The canvas' y coordinate.
		 * @param {Number} options.width - The canvas' width.
		 * @param {Number} options.height - The canvas' height.
		 * @return {Undefined}
		 */
		clear: function(options) {
			//The 2D rendering context.
			var ctx = options.ctx || null;
			
			if (ctx) {
				//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
				ctx.save();
				
				//Clear the canvas.
				ctx.clearRect(options.x || 0, options.y || 0, options.width || ctx.canvas.width, options.height || ctx.canvas.height);

				//Restore the 2D rendering context back to its previous state.
				ctx.restore();
			}
		}
	};
}());
