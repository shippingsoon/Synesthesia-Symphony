/*
 * @description - Vector math submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var Vector = Vector || {};

/*
 * Vector math submodule.
 * @param {Vector} - Vector module.
 * @return {Object}
 */
Vector.Math = (function(vector) {
	'use strict';
	
	return {
		/*
		 * Adds two vectors.
		 * @param {Object|Vector} a - An STG vector.
		 * @param {Object|Vector} b - An STG vector.
		 * @return {Object}
		 */
		add: function(a, b) {
			if (a && a.getPosition)
				a = a.getPosition();
			
			if (b && b.getPosition)
				b = b.getPosition();
				
			return {
				x: (a.x || 0) + (b.x || 0),
				y: (a.y || 0) + (b.y || 0)
			};
			
		},
		
		/*
		 * Subtracts two vectors.
		 * @param {Object|Vector} a - An STG vector.
		 * @param {Object|Vector} b - An STG vector.
		 * @return {Object}
		 */
		subtract: function(a, b) {
			if (a && a.getPosition)
				a = a.getPosition();
			
			if (b && b.getPosition)
				b = b.getPosition();
			
			return {
				x: (a.x || 0) - (b.x || 0),
				y: (a.y || 0) - (b.y || 0)
			};
		},
		
		/*
		 * Multiplies two vectors.
		 * @param {Object|Vector} a - An STG vector.
		 * @param {Object|Vector} b - An STG vector.
		 * @return {Object}
		 */
		multiply: function(a, b) {
			if (a && a.getPosition)
				a = a.getPosition();
			
			if (b && b.getPosition)
				b = b.getPosition();
			
			return {
				x: (a.x || 0) * (b.x || 0),
				y: (a.y || 0) * (b.y || 0)
			};
		},
		
		/*
		 * Divides two vectors.
		 * @param {Object|Vector} a - An STG vector.
		 * @param {Object|Vector} b - An STG vector.
		 * @return {Object}
		 */
		divide: function(a, b) {
			if (a && a.getPosition)
				a = a.getPosition();
			
			if (b && b.getPosition)
				b = b.getPosition();
			
			return {
				x: (a.x || 1) / (b.x || 1),
				y: (a.y || 1) / (b.y || 1)
			};
		},
	};
}(Vector)); 