/*
 * @description - HTML5 Canvas submodule
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Canvas = Canvas || {};

/*
 * This submodule uses an HTML5 2D rendering context to draw a circle.
 * @return {Function}
 */
Canvas.circle = (function() {
	'use strict';
	
	/*
	 * Draws a circle.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {String|STG.Color} options.color - The color.
	 * @param {Number} options.lineWidth - The line width.
	 * @param {String|STG.Color} options.strokeStyle - The outline color.
	 * @param {String} options.globalCompositeOperation - The composite operation.
	 * @return {Undefined}
	 */
	function circle(options) {
		//The 2D rendering context.
		var ctx = options.ctx || null;
		
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();
			
			//Set the composition operation.
			if (options.globalCompositeOperation)
				ctx.globalCompositeOperation = options.globalCompositeOperation;
			
			//Make the shape circular.
			ctx.beginPath();
			ctx.arc(options.x || 0, options.y || 0, options.radius || 10, 0, 2 * Math.PI, false);
			
			//If this is an STG color get its RGBA property.
			if (typeof options.color === 'object')
				options.color = options.color.getRGBA();
			
			//Fill in the circle with the given color.
			ctx.fillStyle = options.color || 'black';
			ctx.fill();
			
			//If a line width is specified stroke an outline around the circle..
			if (options.lineWidth) {
				ctx.lineWidth = options.lineWidth;
				ctx.strokeStyle = options.strokeStyle || 'black';
				ctx.stroke();
			}
			
			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}

	return circle;
}()); 
