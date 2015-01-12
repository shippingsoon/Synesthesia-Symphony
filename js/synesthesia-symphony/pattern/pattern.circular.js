/*
	@description - Circular pattern submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};
var Pattern = Pattern || {};

//Circular pattern submodule.
Pattern.Circular = (function(globals, fsm, stg, resource, pattern) {
	"use strict";
		
	/*
	 * Circular pattern.
	 * @param {FSM} options.fsm - Finite state machine.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.padding - The margin between bullets.
	 * @param {Number} options.degrees - The angle of the initial bullet.
	 * @param {Object} options.position - An x and y coordinate for the initial position of the bullet.
	 * @param {Object} options.offsets - An x and y coordinate for how much we will offset the bullet.
	 * @param {Number} options.max_bullets - The number of bullets to create.
	 * @param {Number[]} options.speeds - An array of speeds. Low numbers are preferred.
	 * @param {STG.Colors[]|String[]} options.colors - An array of STG colors or strings.
	 * @param {Number[]} options.radii - An array circle radii.
	 * @param {Boolean[]} options.is_opens - Determines if a bullet will leave paint trails.
	 * @param {Boolean} options.invert - Flips about the y-axis.
	 */
	function Circular(options) {
		var bullets = [];
		var position = options.position || {x: 0, y:0};
		var offsets = options.offsets || {x: 0, y:0};
		var padding = options.padding || 10;
		var speeds = options.speeds || [4];
		var invert = (options.invert || options.invert === undefined);
		var degrees  = options.degrees || 180;
		var fsm = options.fsm || null;
		var max_bullets = options.max_bullets || 10;
		var ctx = options.ctx;
		var colors = options.colors || ['green'];
		var radii = options.radii || [10, 4]
		var is_opens = options.is_opens || [false];
		var radians = 0;
		var speed = 0;
		
		bullets = pattern.createBullets({
			ctx: ctx,
			position: position,
			offsets: offsets,
			max_bullets: max_bullets,
			speeds: speeds,
			colors: colors,
			radii: radii,
			is_opens: is_opens
		});

		for (var bullet = 0; bullet < max_bullets; bullet++) {
			if (fsm)
				fsm.setSubstate({substate: bullets[bullet].getState()});
			else
				throw 'FSM is undefined';
			
			radians = stg.Math.degreeToRadian({degrees: degrees, invert: invert});
			speed = bullets[bullet].magnitude;

			bullets[bullet].velocity.add({
				x: (speed * Math.cos(radians)) || -1000,
				y: (speed * Math.sin(radians)) || -1000
			});
			
			degrees += padding;
		}
	}
		
	return Circular;
}(window, FSM, STG, Resource, Pattern));