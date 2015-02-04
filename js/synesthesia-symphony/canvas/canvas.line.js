/*
 *	@description - HTML5 Canvas submodule
 *	@copyright - 2014 Shipping Soon
 *	@source - https://github.com/shippingsoon/Synesthesia-Symphony
 *	@website - https://www.shippingsoon.com/synesthesia-symphony/
 *	@version - v0.05
 *	@license - GPLv3
 */

var Canvas = Canvas || {};

/*
 * This submodule uses an HTML5 2D rendering context to draw a line.
 * @return {Function}
 */
Canvas.line = (function() {
	'use strict';
	
	/*
	 * Draws a line.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {String|STG.Color} options.color - The color.
	 * @param {Number} options.lineWidth - The line width.
	 * @param {String} options.cap - The cap.
	 * @param {String} options.globalCompositeOperation - The composite operation.
	 * @return {Undefined}
	 */
	function line(options) {
		//The 2D rendering context.
		var ctx = options.ctx || null;
		
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();
			
			//Set the composition operation.
			if (options.globalCompositeOperation)
				ctx.globalCompositeOperation = options.globalCompositeOperation;
			
			//Set the path of the line.
			ctx.beginPath();
			ctx.moveTo(options.x || 0, options.y || 0);
			ctx.lineTo(options.w || 10, options.h || 10);
			ctx.closePath();

			//Set the color, width and cap of the line.
			ctx.strokeStyle = options.color || 'black';
			ctx.lineWidth = options.lineWidth || 0;
			ctx.lineCap = options.cap || 'butt';

			//Stroke the line.
			ctx.stroke();

			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}

	return line;
}()); 
