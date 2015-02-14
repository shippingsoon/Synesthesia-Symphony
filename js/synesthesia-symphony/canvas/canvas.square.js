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
 * This submodule uses an HTML5 2D rendering context to draw a square.
 * @return {Function}
 */
Canvas.square = (function() {
	'use strict';
	
	/*
	 * Draws a square.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.width - The square's width.
	 * @param {Number} options.height - The square's height.
	 * @param {String|STG.Color} options.color - The color.
	 * @param {Number} options.lineWidth - The line width.
	 * @param {String|STG.Color} options.strokeStyle - The outline color.
	 * @param {String} options.globalCompositeOperation - The composite operation.
	 * @return {Undefined}
	 */
	function square(options) {
		//The 2D rendering context.
		var ctx = options.ctx || null;
	
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();
		
			//Set the composition operation.
			if (options.globalCompositeOperation)
				ctx.globalCompositeOperation = options.globalCompositeOperation;
			
			//Create a square shape.
			ctx.beginPath();
			ctx.rect(options.x || 0, options.y || 0, options.width || options.w || 10, options.height || options.h || 10);
			
			//If this is an STG color get its RGBA property.
			if (typeof options.color === 'object')
				options.color = options.color.getRGBA();
			
			//Fill in the circle with the given color.
			ctx.fillStyle = options.color || 'black';
			ctx.fill();
			
			//Stroke an outline around the square.
			if (options.lineWidth) {
				if (typeof options.strokeStyle === 'object')
					options.strokeStyle = options.strokeStyle.getRGBA();
				
				ctx.lineWidth = options.lineWidth;
				ctx.strokeStyle = options.strokeStyle || 'black';
				ctx.stroke();
			}
			
			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}
	
	return square;
}()); 
