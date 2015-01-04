/*
	@description - Math submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var System = System || {};
var STG = STG || {};

//Math submodule.
STG.Math = (function(globals, system, stg) {
	"use strict";
	
	return {
		/*
		 * Adds two vectors.
		 * @param {Object|STG.Vector} a - An STG vector.
		 * @param {Object|STG.Vector} b - An STG vector.
		 */
		add: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
				
			return {
				x: (a.x || 0) + (b.x || 0),
				y: (a.y || 0) + (b.y || 0)
			};
			
		},
		
		/*
		 * Subtracts two vectors.
		 * @param {Object|STG.Vector} a - An STG vector.
		 * @param {Object|STG.Vector} b - An STG vector.
		 */
		subtract: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
			
			return {
				x: (a.x || 0) - (b.x || 0),
				y: (a.y || 0) - (b.y || 0)
			};
		},
		
		/*
		 * Multiplies two vectors.
		 * @param {Object|STG.Vector} a - An STG vector.
		 * @param {Object|STG.Vector} b - An STG vector.
		 */
		multiply: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
			
			return {
				x: (a.x || 0) * (b.x || 0),
				y: (a.y || 0) * (b.y || 0)
			};
		},
		
		/*
		 * Divides two vectors.
		 * @param {Object|STG.Vector} a - An STG vector.
		 * @param {Object|STG.Vector} b - An STG vector.
		 */
		divide: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
			
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
		 * @param {Object|STG.Vector} a - The vector.
		 * @param {Object|STG.Vector} a - The target vector.
		 */
		getTargetAngle: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
			
			return Math.atan2(a.y - b.y, a.x - b.x);
		},
		
		/*
		 * Gets the distance between two objects. Todo: optimize this function.
		 * @param {Object|STG.Vector} a - An STG vector or object.
		 * @param {Object|STG.Vector} b - An STG vector or object.
		 */
		distance: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
			
			//return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
			return Math.sqrt(((b.x - a.x) * (b.x - a.x)) + ((b.y - a.y) * (b.y - a.y))); 
		},
		
		/*
		 * Checks for collision between two circles.
		 * @param {Object|STG.Circle} a - An STG circle or object.
		 * @param {Object|STG.Circle} b - An STG circle or object.
		 */
		circleCollision: function(a, b) {
			if (a instanceof stg.Circle)
				a = a.getPosition();
			
			if (b instanceof stg.Circle)
				b = b.getPosition();
			
			//If the distance between the colliding objects is smaller than the combined radius.
			return (this.distance(a, b) < (a.radius + b.radius));
		},
		
		/*
		 * Checks for collision between a circle and square.
		 * @param {Object|STG.Circle} a - An STG circle or object.
		 * @param {Object|STG.Square} b - An STG square or object.
		 */
		circleSquareCollision: function(a, b) {
			var c = new stg.Vector({x: 0, y: 0});
			
			if (a instanceof STG.Circle)
				a = a.getPosition();
			
			if (b instanceof STG.Square)
				a = a.getPosition();
				
			if (a.x < b.x)
				c.x = b.x;
			
			else if (a.x > b.x + b.width)
				c.x = b.x + b.width;
			
			else
				c.x = a.x;
			
			 if (a.y < b.y)
				c.y = b.y;
			
			else if (a.y > b.y + b.height)
				c.y = b.y + b.height;
			
			else
				c.y = a.y;
			
			return (this.distanceSquared(a, c) < (a.radius * a.radius));
		},
		
		/*
		 * Returns the squared distance between two vectors.
		 * @param {Object|STG.Vector} a - An STG vector or object.
		 * @param {Object|STG.Vector} b - An STG vector or object.
		 */
		distanceSquared: function(a, b) {
			if (a instanceof stg.Vector)
				a = a.getPosition();
			
			if (b instanceof stg.Vector)
				b = b.getPosition();
			
			var delta = new stg.Vector({
				x: b.x - a.x,
				y: b.y - a.y
			});
			
			var d = delta.getPosition();
			
			return (d.x * d.x) + (d.y * d.y);
		},
	};
}(window, System, STG)); 