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
				x: a.x + b.x,
				y: a.y + b.y
			};
			
		},
		
		/*
		 * Subtracts two vectors.
		 * @param {Object||STG.Vector} a - An STG vector.
		 * @param {Object||STG.Vector} b - An STG vector.
		 */
		subtract: function(a, b) {
			return {
				x: a.x - b.x,
				y: a.y - b.y
			};
		},
		
		/*
		 * Multiplies two vectors.
		 * @param {Object||STG.Vector} a - An STG vector.
		 * @param {Object||STG.Vector} b - An STG vector.
		 */
		multiply: function(a, b) {
			return {
				x: a.x * b.x,
				y: a.y * b.y
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
				x: a.x / b.x,
				y: a.y / b.y
			};
		},
		
	};
}(window, System, STG)); 