/*
	@description - Synesthesia Symphony's HTML5 Canvas module
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//This module handles HTML5 Canvas related functions.
STG.Canvas = (function(globals) {
	"use strict";
	
	return {
		/*
		 * Draws a line.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {String|STG.Color} options.color - The color.
		 * @param {Number} options.lineWidth - The line width.
		 * @param {String} options.cap - The cap.
		 * @param {String} options.globalCompositeOperation - The composite operation.
		 */
		line : function(options) {
			var ctx = options.ctx || null;
			
			if (ctx) {
				if (options.globalCompositeOperation)
					ctx.globalCompositeOperation = options.globalCompositeOperation;
				
				ctx.beginPath();
				ctx.moveTo(options.x || 0, options.y || 0);
				ctx.lineTo(options.w || 10, options.h || 10);
				ctx.closePath();
				ctx.strokeStyle = options.color || 'black';
				ctx.lineWidth = options.lineWidth || 0;
				ctx.lineCap = options.cap || 'butt';
				ctx.stroke();
			}
		},
		
		/*
		 * Draws a circle.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {String|STG.Color} options.color - The color.
		 * @param {Number} options.lineWidth - The line width.
		 * @param {String|STG.Color} options.strokeStyle - The outline color.
		 * @param {String} options.globalCompositeOperation - The composite operation.
		 */
		circle : function(options) {
			var ctx = options.ctx || null;
			
			if (ctx) {
				ctx.save();
				
				if (options.globalCompositeOperation)
					ctx.globalCompositeOperation = options.globalCompositeOperation;
				
				ctx.beginPath();
				ctx.arc(options.x || 0, options.y || 0, options.radius || 10, 0, 2 * Math.PI, false);
				ctx.fillStyle = options.color || 'black';
				ctx.fill();
				if (options.lineWidth) {
					ctx.lineWidth = options.lineWidth;
					ctx.strokeStyle = options.strokeStyle || 'black';
					ctx.stroke();
				}
				
				ctx.restore();
			}
		},
		
		/*
		 * Draws a square.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {String|STG.Color} options.color - The color.
		 * @param {Number} options.lineWidth - The line width.
		 * @param {String|STG.Color} options.strokeStyle - The outline color.
		 * @param {String} options.globalCompositeOperation - The composite operation.
		 */
		square : function(options) {
			var ctx = options.ctx || null;
			
			if (ctx) {
				ctx.save();
				
				if (options.globalCompositeOperation)
					ctx.globalCompositeOperation = options.globalCompositeOperation;
				
				ctx.beginPath();
				ctx.rect(options.x || 0, options.y || 0, options.width || options.w || 10, options.height || options.h || 10);
				ctx.fillStyle = options.color || options.fillStyle || 'black';
				ctx.fill();
				if (options.lineWidth) {
					ctx.lineWidth = options.lineWidth;
					ctx.strokeStyle = options.strokeStyle || 'black';
					ctx.stroke();
				}
				
				ctx.restore();
			}
		},
		
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
		text : function(options) {
			var ctx = options.ctx || null;
			
			if (ctx) {
				ctx.save();
				
				//Set the font type and color.
				ctx.font = options.font || 'bold 16px arial';
				ctx.fillStyle = options.color || '#444';
				ctx.textAlign = options.align || 'left';
				if (options.shadowColor) {
					ctx.shadowColor = options.shadowColor;
					ctx.shadowOffsetX = options.shadowoffsetX || 1;
					ctx.shadowOffsetY = options.shadowoffsetY || 1;
					ctx.shadowBlur = options.shadowBlur || 0;
				}
				ctx.fillText(options.message || '', options.x || 0, options.y || 0);
				ctx.closePath();
				
				ctx.restore();
			}
		},
	};
}(window)); 