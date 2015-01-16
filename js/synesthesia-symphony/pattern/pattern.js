/*
	@description - Pattern module.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};

//Pattern module.
Pattern = (function(globals, fsm, stg, resource) {
	"use strict";
	var layers = resource.layers;
	
	return {
		/*
		 * Initializes bullets with given properties. Returns an array of bullets.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Object} options.position - An x and y coordinate for the initial position of the bullet.
		 * @param {Object} options.offsets - An x and y coordinate for how much we will offset the bullet.
		 * @param {Number} options.max_bullets - The number of bullets to create.
		 * @param {Number[]} options.speeds - An array of speeds.
		 * @param {STG.Colors[]|String[]} options.colors - An array of STG colors or strings.
		 * @param {Number[]} options.radii - An array circle radii.
		 * @param {Boolean[]} options.is_opens - Determines if a bullet will leave paint trails.
		 * @param {Number} options.target - Set to 0 to retrieve the player and 1 to retrieve enemies.
 		 */
		createBullets: function(options) {
			var bullets = [];
			var ctx = options.ctx || layers.buffer.getContext().ctx;
			var position = options.position || {x: 0, y: 0};
			var offsets = options.offsets || {x: 0, y: 0};
			var max_bullets = options.max_bullets || 10;
			var speeds = options.speeds || [4];
			var colors = options.colors || ['green'];
			var radii = options.radii || [10];
			var is_opens = options.is_opens || [false];
			var target = options.target || 0;
			var indices = {
				color: {value: 0, length: colors.length},
				radius: {value: 0, length: radii.length},
				is_open: {value: 0, length: is_opens.length},
				speed: {value: 0, length: speeds.length}
			};
			
			for (var bullet = 0; bullet < max_bullets; bullet++) {
				bullets.push(new stg.Bullet({
					ctx: ctx,
					x: position.x + offsets.x,
					y: position.y + offsets.y,
					color: colors[indices.color.value],
					radius: radii[indices.radius.value],
					is_open: is_opens[indices.is_open.value],
					magnitude: speeds[indices.speed.value],
					target: target
				}));
				
				for (var index in indices)
					if (++indices[index].value === indices[index].length)
						indices[index].value = 0;
			}
			
			return bullets;
		}
	};
	
}(window, FSM, STG, Resource));