/*
 * @description - Square submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Shape = Shape || {};
var STG = STG || {};
var Canvas = Canvas || {};

/*
 * Square submodule.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Canvas} canvas - Canvas module.
 * @param {Vector} vector - Vector module.
 * @return {Function}
 */
Shape.Square = (function(stg, canvas, vector) {
	'use strict';
	
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
	 * @return {Undefined}
	 */
	function Square(options) {
		//Call our parent's constructor.
		vector.call(this, options);
		
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
		 * @return {Undefined}
		 */
		this.draw = function(options) {
			var position = that.getPosition();
			var ctx = options.ctx || that.getContext();
			
			//Draw the square.
			if (ctx) {
				canvas.square({
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
		 * @return {Undefined}
		 */
		this.setSquare = function(options) {
			that.setPosition(options);
			
			width = options.width || options.w || width;
			height = options.height || options.h || height;
		};
		
		/*
		 * Returns the square's position, width and height.
		 * @return {Object} - The shape's x and y coordinates and width/height.
		 */
		this.getSquare = function() {
			var position = that.getPosition();
			position.width = position.w = width;
			position.height = position.h = height;
			
			return position;
		};
		
		/*
		 * Set the square's color.
		 * @param {String|STG.Color} options.color - The new color.
		 * @return {Undefined}
		 */
		this.setColor = function(_color) {
			color = _color;
		};
		
		/*
		 * Get the square's color.
		 * @return {STG.Color|String}
		 */
		this.getColor = function() {
			return color;
		};
	};
	
	Square.prototype = Object.create(vector.prototype);
	
	return Square;
}(STG, Canvas, Vector));