/*
 * @description - Circle submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Shape = Shape || {};

/*
 * Circle submodule.
 * @return {Function}
 */
Shape.Circle = (function(stg, canvas, vector) {
	'use strict';
	
	 /*
	  * Circle constructor.
	  * @param {Number} options.x - The x coordinate.
	  * @param {Number} options.y - The y coordinate.
	  * @param {Number} options.radius - The radius.
	  * @param {String|STG.Color} options.color - The color.
	  * @param {Number} options.lineWidth - The line width.
	  * @param {String|STG.Color} options.strokeStyle - The outline color.
	  * @return {Undefined}
	  */
	function Circle(options) {
		//Call our parent's constructor.
		vector.call(this, options);
		
		//Reference to the current object.
		var that = this;
		
		//The circle's radius.
		var radius = options.radius || options.r || arguments[2] || 10;
		
		//The circle's color.
		var color = options.color || new stg.Color(0, 255, 0, 1);
		
		//The circle's line width.
		var line_width = (options.lineWidth !== undefined) ? options.lineWidth : 1;
		
		//The circle's line color.
		var line_color = options.strokeStyle || new stg.Color(0, 0, 0, 1);
		
		/*
		 * Draws the circle.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.radius - The circle's radius.
		 * @param {String|STG.Color} options.color - The color.
		 * @param {Number} options.lineWidth - The line width.
		 * @param {String|STG.Color} options.strokeStyle - The outline color.
		 * @return {Undefined}
		 */
		this.draw = function(options) {
			var position = that.getPosition();
			var ctx = options.ctx || that.getContext();
			
			//Draw the circle.
			if (ctx) {
				canvas.circle({
					x: options.x || position.x,
					y: options.y || position.y,
					radius: options.radius || options.r || radius,
					color: options.color || color,
					ctx: ctx,
					lineWidth: line_width,
					strokeStyle: line_color
				});
			}
		};
		
		/*
		 * Sets the circle.
		 * @param {Number} options.x - The x coordinate.
		 * @param {Number} options.y - The y coordinate.
		 * @param {Number} options.radius - The radius.
		 * @return {Undefined}
		 */
		this.setCircle = function(options) {
			that.setPosition(options);
			
			radius = options.radius || options.r || radius;
		};
		
		/*
		 * Returns the circle's position and radius.
		 * @return {Object} - The x and y coordinates of this shape and the radius.
		 */
		this.getCircle = function() {
			var position = that.getPosition();
			
			position.radius = position.r = radius;
			
			return position;
		};

		/*
		 * Set the circle's radius.
		 * @param {Number} _radius - The new radius.
		 * @return {Undefined}
		 */
		this.setRadius = function(_radius) {
			if (_radius > 0)
				radius = _radius;
		};
		
		/*
		 * Get the circle's radius.
		 * @return {Object}
		 */
		this.getRadius = function() {
			return {radius: radius, r: radius};
		};
		
		/*
		 * Set the circle's color.
		 * @param {String|STG.Color} options.color - The new color.
		 * @return {Undefined}
		 */
		this.setColor = function(_color) {
			color = _color;
		};
		
		/*
		 * Get the circle's color.
		 * @return {STG.Color|String}
		 */
		this.getColor = function() {
			return color;
		};
	};
	
	Circle.prototype = Object.create(vector.prototype);
	
	return Circle;
}(STG, Canvas, Vector));