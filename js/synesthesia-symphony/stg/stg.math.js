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
		
	};
}(window, System, STG)); 