/*
 * @description - Vector math submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var STG = STG || {};
var Vector = Vector || {};

/*
 * Vector math submodule.
 * @param {Vector} - Vector module.
 * @return {Object}
 */
STG.Math = (function(vector) {
	'use strict';
	
	return {
		/*
		 * Converts degrees to radians.
		 * @param {Number} options.degrees - The degree.
		 * @param {Boolean} options.invert - Determines if we flip about the y-axis.
		 * @return {Number}
		 */
		degreeToRadian: function(options) {
			var invert = (!options.invert && !arguments[1]) ? 1 : -1;
			
			return ((options.degrees || arguments[0] || 0)  * invert) * (Math.PI / 180);
		},
		
		/*
		 * Converts radians to degrees.
		 * @param {Number} options.radians - The radian.
		 * @param {Boolean} options.invert - Determines if we flip about the y-axis.
		 * @return {Number}
		 */
		radianToDegree: function(options) {
			var invert = (!options.invert && !arguments[1]) ? 1 : -1;
			
			return ((options.radians || arguments[0] || 0) * invert) * (180 / Math.PI);
		},
		
		/*
		 * Gets a target angle.
		 * @param {Object|Vector} a - The vector.
		 * @param {Object|Vector} a - The target vector.
		 * @return {Number}
		 */
		getTargetAngle: function(a, b) {
			if (a && a.getPosition)
				a = a.getPosition();
			
			if (b && b.getPosition)
				b = b.getPosition();
			
			return Math.atan2(a.y - b.y, a.x - b.x);
		},
		
		/*
		 * Gets the distance between two objects. Todo: optimize this function.
		 * @param {Object|Vector} a - An STG vector or object.
		 * @param {Object|Vector} b - An STG vector or object.
		 * @return {Number}
		 */
		distance: function(a, b) {
			if (a && a.getPosition)
				a = a.getPosition();
			
			if (b && b.getPosition)
				b = b.getPosition();
			
			//return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
			return Math.sqrt(((b.x - a.x) * (b.x - a.x)) + ((b.y - a.y) * (b.y - a.y))); 
		},
		
		/*
		 * Checks for collision between two circles.
		 * @param {Object|Shape.Circle} a - An STG circle or object.
		 * @param {Object|Shape.Circle} b - An STG circle or object.
		 * @return {Boolean}
		 */
		circleCollision: function(a, b) {
			if (a && a.getCircle)
				a = a.getCircle();
			
			if (b && b.getCircle)
				b = b.getCircle();
			
			//If the distance between the colliding objects is smaller than the combined radius.
			return (this.distance(a, b) < (a.radius + b.radius));
		},
		
		/*
		 * Checks for collision between a circle and square.
		 * @param {Object|Shape.Circle} a - An STG circle or object.
		 * @param {Object|Shape.Square} b - An STG square or object.
		 * @return {Boolean}
		 */
		circleSquareCollision: function(a, b) {
			var c = new vector({x: 0, y: 0});
			
			if (a && a.getCircle)
				a = a.getCircle();

			if (b && b.getSquare)
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
		 * {Shape.Circle|Object} a - An STG circle or object.
		 * {Shape.Square|Object} b - An STG square or object.
		 * @return {Boolean}
		 */
		outOfBounds: function(a, b) {
			if (a && a.getCircle)
				a = a.getCircle();

			if (b && b.getSquare)
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
		 * @param {Object|Vector} a - An STG vector or object.
		 * @param {Object|Vector} b - An STG vector or object.
		 * @return {Number}
		 */
		distanceSquared: function(a, b) {
			if (a.getPosition)
				a = a.getPosition();
				
			if (b.getPosition)
				b = b.getPosition();
			
			var delta = new vector({
				x: b.x - a.x,
				y: b.y - a.y
			});
			
			var d = delta.getPosition();
			
			return (d.x * d.x) + (d.y * d.y);
		},
	};
}(Vector)); 