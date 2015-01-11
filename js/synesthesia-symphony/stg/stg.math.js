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
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
			
			if (b.hasOwnProperty('getPosition'))
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
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
			
			if (b.hasOwnProperty('getPosition'))
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
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
			
			if (b.hasOwnProperty('getPosition'))
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
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
			
			if (b.hasOwnProperty('getPosition'))
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
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
			
			if (b.hasOwnProperty('getPosition'))
				b = b.getPosition();
			
			return Math.atan2(a.y - b.y, a.x - b.x);
		},
		
		/*
		 * Gets the distance between two objects. Todo: optimize this function.
		 * @param {Object|STG.Vector} a - An STG vector or object.
		 * @param {Object|STG.Vector} b - An STG vector or object.
		 */
		distance: function(a, b) {
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
			
			if (b.hasOwnProperty('getPosition'))
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
			if (a.hasOwnProperty('getCircle'))
				a = a.getCircle();
			
			if (b.hasOwnProperty('getCircle'))
				b = b.getCircle();
			
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
			
			if (a.hasOwnProperty('getCircle'))
				a = a.getCircle();

			if (b.hasOwnProperty('getSquare'))
				b = b.getSquare();
			
			if (a.x < b.x)
				c.setPosition({x: b.x});
			
			else if (a.x > b.x + b.width)
				c.setPosition({x: b.x + b.width});
			
			else
				c.setPosition({x: a.x});
			
			if (a.y < b.y)
				c.setPosition({y: b.y});
			
			else if (a.y > b.y + b.height)
				c.setPosition({y: b.height});
			
			else
				c.setPosition({y: a.y});
			
			return (this.distanceSquared(a, c) < (a.radius * a.radius));
		},
		
		/*
		 * Checks to see if a circle is out of bounds
		 * {STG.Circle|Object} a - An STG circle or object.
		 * {STG.Square|Object} b - An STG square or object.
		 */
		outOfBounds: function(a, b) {
			if (a.hasOwnProperty('getCircle'))
				a = a.getCircle();

			if (b.hasOwnProperty('getSquare'))
				b = b.getSquare();
			
			if (a.x < b.x - a.radius)
				return true;
			
			if (a.x > b.w + a.radius)
				return true;
			
			if (a.y > b.h + a.radius)
				return true;
			
			if (a.y < b.y - a.radius)
				return true;
			
			return false;
		},
		
		/*
		 * Returns the squared distance between two vectors.
		 * @param {Object|STG.Vector} a - An STG vector or object.
		 * @param {Object|STG.Vector} b - An STG vector or object.
		 */
		distanceSquared: function(a, b) {
			if (a.hasOwnProperty('getPosition'))
				a = a.getPosition();
				
			if (b.hasOwnProperty('getPosition'))
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