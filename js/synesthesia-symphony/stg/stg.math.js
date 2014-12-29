/*
	@description - 
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var STG = STG || {};
var System = System || {};

//
STG.Math = (function(globals, system, stg) {
	"use strict";
	
	return {
		/*
		 * Adds two vectors.
		 * @param {Object||STG.Vector} a - An STG vector.
		 * @param {Object||STG.Vector} b - An STG vector.
		 */
		add: function(a, b) {
			return {
				x: (a.x || 0) + (b.x || 0),
				y: (a.y || 0) + (b.y || 0)
			};
			
		},
		
		/*
		 * Subtracts two vectors.
		 * @param {Object||STG.Vector} a - An STG vector.
		 * @param {Object||STG.Vector} b - An STG vector.
		 */
		subtract: function(a, b) {
			return {
				x: (a.x || 0) - (b.x || 0),
				y: (a.y || 0) - (b.y || 0)
			};
		},
		
		/*
		 * Multiplies two vectors.
		 * @param {Object||STG.Vector} a - An STG vector.
		 * @param {Object||STG.Vector} b - An STG vector.
		 */
		multiply: function(a, b) {
			return {
				x: (a.x || 0) * (b.x || 0),
				y: (a.y || 0) * (b.y || 0)
			};
		},
		
		/*
		 * Divides two vectors.
		 * @param {Object||STG.Vector} a - An STG vector.
		 * @param {Object||STG.Vector} b - An STG vector.
		 */
		divide: function(a, b) {
			if (b.x === 0 || b.y === 0)
				throw 'Division by zero';
			
			return {
				x: (a.x || 1) / (b.x || 1),
				y: (a.y || 1) / (b.y || 1)
			};
		},
		
		/*
		 * Converts degrees to radians.
		 * @param {Number} options.degrees - The degree.
		 * @param {Boolean} options.invert - Determines if we flip about the y-axis.
		 */
		degreeToRadian: function(options) {
			var invert = (!options.invert && !arguments[1]) ? 1 : -1;
			
			return ((options.degrees || arguments[0] || 0)  * invert) * (Math.PI / 180);
		},
		
		/*
		 * Converts radians to degrees.
		 * @param {Number} options.radians - The radian.
		 * @param {Boolean} options.invert - Determines if we flip about the y-axis.
		 */
		radianToDegree: function(options) {
			var invert = (!options.invert && !arguments[1]) ? 1 : -1;
			
			return ((options.radians || arguments[0] || 0) * invert) * (180 / Math.PI);
		},
		
		/*
		 * Gets a target angle.
		 * @param {Number} ax - The target's x coordinate.
		 * @param {Number} ay - The target's y coordinate.
		 * @param {Number} bx - The x coordinate.
		 * @param {Number} by - The y coordinate.
		 */
		getTargetAngle: function(ax, ay, bx, by) {
			return Math.atan2(ay - by, ax - bx);
		},
		
		/*
		 * Gets the distance between two objects. Todo: optimize this function.
		 * @param {Number} ax - The first object's x coordinate.
		 * @param {Number} ay - The first object's y coordinate.
		 * @param {Number} bx - The second object's x coordinate.
		 * @param {Number} by - The second object's y coordinate.
		 */
		distance: function(ax, ay, bx, by) {
			//return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
			return Math.sqrt(((bx - ax) * (bx - ax)) + ((by - ay) * (by - ay))); 
		},
		
		circleCollision: function(a, b) {
			var aRadius = a.getRadius().radius;
			var bRadius = b.getRadius().radius;
			
			//If the distance between the colliding objects is smaller than the combined radius.
			return (this.distance(a, b) < (aRadius + bRadius));
		},
		
		circleSquareCollision: function(a, b) {
			var c = new stg.Vector({x: 0, y: 0});
			
			if (a.x < b.x)
				c.x = b.x;
			
			else if (a.x > b.x + b.w)
				c.x = b.x + b.w;
			
			else
				c.x = a.x;
			
			 if (a.y < b.y)
				c.y = b.y;
			
			else if (a.y > b.y + b.h)
				c.y = b.y + b.h;
			
			else
				c.y = a.y;
			//console.log('a', this.distanceSquared(a.x, a.y, c.x, c.y));
			//console.log('b', a.r * a.r)
			return (this.distanceSquared(a.x, a.y, c.x, c.y) < a.r * a.r);
		},
		
		distanceSquared: function(ax, ay, bx, by) {
			var delta = new stg.Vector({
				x: bx - ax,
				y: by - ay
			});
			
			var d = delta.getPosition();
			
			//console.log("delta", delta);
			return (d.x * d.x) + (d.y * d.y);
		},
		
	};
}(window, System, STG)); 