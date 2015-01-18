/*
	@description - Square submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var STG = STG || {};

//Square submodule.
STG.Square = (function(stg, resource) {
	"use strict";
	
	/*
	 * Square constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.width - The square's width.
	 * @param {Number} options.height - The square's height.
	 * @param {String|STG.Color} options.color - The square's color.
	 * @param {Number} options.lineWidth - The line width.
	 * @param {String|STG.Color} options.strokeStyle - The outline color.
	 */
	function Square(options) {
		//Call our parent's constructor.
		stg.Vector.call(this, options);
		
		//Reference to the current object.
		var that = this;
		
		//The square's width.
		var width = options.width || options.w || arguments[2] || 10;
		
		//The square's height.
		var height = options.height || options.h || arguments[3] || 10;
		
		//The square's color.
		var color = options.color || new stg.Color(0, 255, 0, 1);
		
		//The square's line width.
		var line_width = (options.lineWidth !== undefined) ? options.lineWidth : 1;
		
		//The square's line color.
		var line_color = options.strokeStyle || new stg.Color(0, 0, 0, 1);
		
		/*
		 * Draws the square.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.width - The square's width.
		 * @param {Number} options.height - The square's height.
		 * @param {String|STG.Color} options.color - The color.
		 * @param {Number} options.lineWidth - The line width.
		 * @param {String|STG.Color} options.strokeStyle - The outline color.
		 */
		this.draw = function(options) {
			var position = this.getPosition();
			var ctx = options.ctx || this.getContext();
			
			//Draw the square.
			if (ctx) {
				stg.Canvas.square({
					x: options.x || position.x,
					y: options.y || position.y,
					width: options.width || options.w || width,
					height: options.height || options.h || height,
					color: options.color || color,
					ctx: ctx,
					lineWidth: options.ctx || line_width
				});
			}
		};
		
		/*
		 * Sets the square.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.width - The width.
		 * @param {Number} options.height - The height.
		 */
		this.setSquare = function(options) {
			this.setPosition(options);
			
			width = options.width || options.w || width;
			height = options.height || options.h || height;
		};
		
		/*
		 * Returns the square's position, width and height.
		 */
		this.getSquare = function() {
			var position = this.getPosition();
			position.width = position.w = width;
			position.height = position.h = height;
			
			return position;
		};
		
		/*
		 * Set the square's color.
		 * @param {String|STG.Color} options.color - The new color.
		 */
		this.setColor = function(_color) {
			color = _color;
		};
		
		/*
		 * Get the square's color.
		 */
		this.getColor = function() {
			return color;
		};
	};
	
	Square.prototype = Object.create(stg.Vector.prototype);
	
	return Square;
}(STG));