/*
 * @description - Lifeup submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Item = Item || {};
var STG = STG || {};
var Canvas = Canvas || {};

/*
 * Lifeup submodule.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Canvas} canvas - Canvas module.
 * @param {Vector} vector - Vector module.
 * @return {Function}
 */
Item.Lifeup = (function(stg, canvas, vector) {
	'use strict';
	
	/*
	 * Lifeup constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.x - The x coordinate.
	 * @param {Number} options.y - The y coordinate.
	 * @param {Number} options.width - The item's width.
	 * @param {Number} options.height - The item's height.
	 * @param {String|STG.Color} options.color - The item's color.
	 * @param {Number} options.lineWidth - The line width.
	 * @param {String|STG.Color} options.strokeStyle - The outline color.
	 * @return {Undefined}
	 */
	function Lifeup(options) {
		//Call our parent's constructor.
		vector.call(this, options);
		
		//Reference to the current object.
		var that = this;
		
		//The item's width.
		var width = options.width || options.w || arguments[2] || 10;
		
		//The item's height.
		var height = options.height || options.h || arguments[3] || 10;
		
		//The item's color.
		var color = options.color || new stg.Color(0, 255, 0, 1);
		
		//The item's line width.
		var line_width = (options.lineWidth !== undefined) ? options.lineWidth : 1;
		
		//The item's line color.
		var line_color = options.strokeStyle || new stg.Color(0, 0, 0, 1);
		
		/*
		 * Draws the item.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.width - The item's width.
		 * @param {Number} options.height - The item's height.
		 * @param {String|STG.Color} options.color - The color.
		 * @param {Number} options.lineWidth - The line width.
		 * @param {String|STG.Color} options.strokeStyle - The outline color.
		 * @return {Undefined}
		 */
		this.draw = function(options) {
			var position = that.getPosition();
			var ctx = options.ctx || that.getContext();
			
			//Draw the item.
			if (ctx) {
				canvas.Square({
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
		 * Sets the Lifeup.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.width - The width.
		 * @param {Number} options.height - The height.
		 * @return {Undefined}
		 */
		this.setLifeup = function(options) {
			that.setPosition(options);
			
			width = options.width || options.w || width;
			height = options.height || options.h || height;
		};
		
		/*
		 * Returns the Lifeup's position, width and height.
		 * @return {Object} - The Item's x and y coordinates and width/height.
		 */
		this.getLifeup = function() {
			var position = that.getPosition();
			position.width = position.w = width;
			position.height = position.h = height;
			
			return position;
		};
		
		
	};
	
	Lifeup.prototype = Object.create(vector.prototype);
	
	return Lifeup;
}(STG, Canvas, Vector));