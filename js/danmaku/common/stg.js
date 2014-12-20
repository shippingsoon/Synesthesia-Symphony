/*
	@description - Danmaku configuration module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/TBA
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var STG = STG || {};

//Danmaku module. 
STG = (function(globals) {
	"use strict";
	
	return {
		//Returns the distance between two points.
		distance: function(a, b) {
			a = a.getPosition();
			b = b.getPosition();
			
			return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
		},
		
		//Get the angle of a target relative to a given position.
		angle: function(a, b) {
			var target = a.getPosition();
			var position = b.getPosition();
			
			return Math.atan2(target.y - position.y, target.x - position.x);
		},
		
		//Circular collision detection.
		circleCollision: function(a, b) {
			var aRadius = a.getRadius().radius;
			var bRadius = b.getRadius().radius;
			
			//If the distance between the colliding objects is smaller than the combined radius.
			return (this.distance(a, b) < (aRadius + bRadius));
		}
	};
}(window)); 

function hi(positions) {
		k += positions.x || 0;
		n += positions.y || 0;
	}