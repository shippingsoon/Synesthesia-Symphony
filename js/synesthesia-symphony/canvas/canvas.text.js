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
 * This submodule uses an HTML5 2D rendering context to draw text.
 * @return {Function}
 */
Canvas.text = (function() {
	'use strict';
	
	/*
	 * Draws text.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {String} options.message - The message.
	 * @param {String|STG.Color} options.color - The color.
	 * @param {String} options.font - The font.
	 * @param {String} options.align - The text alignment.
	 * @param {String|STG.Color} options.shadowColor - The text shadow color.
	 * @param {Number} options.shadowoffsetX - The text shadow's x offset.
	 * @param {Number} options.shadowoffsetY - The text shadow's y offset.
	 * @param {Number} options.shadowBlur - The text shadow blur.
	 */
	function text(options) {
		//The 2D rendering context.
		var ctx = options.ctx || null;
	
		if (ctx) {
			//Save the 2D rendering context's current state. We will restore it back to this state when we are finished with it.
			ctx.save();
		
			//Set the composition operation.
			if (options.globalCompositeOperation)
				ctx.globalCompositeOperation = options.globalCompositeOperation;
			
			//Set the font.
			ctx.font = options.font || 'bold 16px arial';

			//Set the text's color.
			ctx.fillStyle = options.color || '#444';
			
			//Set the text's alignment.
			ctx.textAlign = options.align || 'left';

			//set the text's shadow.
			if (options.shadowColor) {
				ctx.shadowColor = options.shadowColor;
				ctx.shadowOffsetX = options.shadowoffsetX || 1;
				ctx.shadowOffsetY = options.shadowoffsetY || 1;
				ctx.shadowBlur = options.shadowBlur || 0;
			}

			//Set the text's message.
			ctx.fillText(options.message || '', options.x || 0, options.y || 0);
			
			//Restore the 2D rendering context back to its previous state.
			ctx.restore();
		}
	}

	return text;
}()); 
