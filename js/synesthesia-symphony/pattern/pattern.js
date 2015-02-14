/*
 * @description - Pattern module.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var STG = STG || {};
var Resource = Resource || {};

/*
 * Pattern module.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Resource} resource - Resource module.
 * @return {Object}
 */
Pattern = (function(stg, resource) {
	'use strict';
	
	return {
		/*
		 * Initializes bullets with given properties.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Object} options.position - An x and y coordinate for the initial position of the bullet.
		 * @param {Object} options.offsets - An x and y coordinate for how much we will offset the bullet.
		 * @param {Number} options.max_bullets - The number of bullets to create.
		 * @param {Number[]} options.speeds - An array of speeds.
		 * @param {STG.Colors[]|String[]} options.colors - An array of STG colors or strings.
		 * @param {Number[]} options.radii - An array circle radii.
		 * @param {Boolean[]} options.is_opens - Determines if a bullet will leave paint trails.
		 * @param {Number} options.target_type - The target type. Set to 0 to retrieve the player and 1 to retrieve enemies.
		 * @return {Undefined}
 		 */
		createBullets: function(options) {
			var layers = resource.layers;
			var length = resource.bullets.length;
			var ctx = options.ctx || layers.buffer.getContext();
			var position = options.position || {x: 0, y: 0};
			var offsets = options.offsets || {x: 0, y: 0};
			var max_bullets = options.max_bullets || 10;
			var speeds = options.speeds || [4];
			var colors = options.colors || ['green'];
			var radii = options.radii || [10];
			var is_opens = options.is_opens || [false];
			var target_type = options.target_type || stg.targets.player;
			var indices = {
				color: {value: 0, length: colors.length},
				radius: {value: 0, length: radii.length},
				is_open: {value: 0, length: is_opens.length},
				speed: {value: 0, length: speeds.length}
			};
			
			for (var bullet = length; bullet < max_bullets + length; bullet++) {
				resource.bullets.push(new stg.Bullet({
					ctx: ctx,
					x: position.x + offsets.x,
					y: position.y + offsets.y,
					color: colors[indices.color.value],
					radius: radii[indices.radius.value],
					is_open: is_opens[indices.is_open.value],
					magnitude: speeds[indices.speed.value],
					target_type: target_type
				}));
				
				for (var index in indices)
					if (++indices[index].value === indices[index].length)
						indices[index].value = 0;
			}
		}
	};
}(STG, Resource));