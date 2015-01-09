/*
	@description - Pattern submodule.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};

//Pattern submodule.
STG.Pattern = (function(fsm, stg, resource) {
	"use strict";
	
	var layers = resource.layers;
	
	 /*
	  * Pattern constructor.
	  * @param {Object} options - TBA
	  */
	function Pattern(options) {
		//A reference to the current object.
		var that = this;
		
		//The pattern's state.
		this.state = new fsm.State(options);
		
		var once = true;
		var _once = true;
		var counter = 0;
		var inter = null;
		var current_time = new Date;
		var elapsed_time = new Date;
		var bullets = [];
		var MAX_BULLETS = 20;
		var parent = null;
		var parent_position = null;
		var ctx = options.ctx;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.start = function(game) {
		
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		 var degrees = 0;
		this.state.update = function(game) {
			
			if (Keydown.z) {
				if (once) {
					parent = that.state.getParent();
					
					circular({
						fsm: game.fsm,
						ctx: ctx,
						position: parent.getPosition(),
						max_bullets: 3,
						padding: 20,
						degrees: degrees += 10,
						radii: [20, 24]
					}); 
					
					
					
				}
				//once = false;
			}
			
			/*
			 * Circular pattern.
			 * @param {STG.Bullet[]} - An array of STG bullets.
			 */
			function circular(options) {
				var bullets = [];
				var position = options.position || {x: 0, y:0};
				var padding = options.padding || 10;
				var speed = options.speed || 4;
				var invert = (options.invert || options.invert === undefined);
				var degrees  = options.degrees || 180;
				var radians = 0;
				var fsm = options.fsm;
				var max_bullets = options.max_bullets || 10;
				var ctx = options.ctx;
				var colors = ['red', 'green', 'blue'];
				var radii = options.radii || [10, 10]
				var color_idx = 0;
				var radius_idx = 0;
				
				compositior({
					bullets: bullets,
					position: position,
					max_bullets: max_bullets,
					ctx: ctx,
					colors: colors,
					radii: radii
				});
	
				for (var bullet = 0; bullet < max_bullets; bullet++) {
					fsm.setSubstate({substate: bullets[bullet].state});
					
					radians = stg.Math.degreeToRadian({degrees: degrees, invert: invert});

					bullets[bullet].velocity.add({
						x: speed * Math.cos(radians),
						y: speed * Math.sin(radians)
					});
					
					degrees += padding;
					
					
				}
			}
			
			/*
			 * Initializes bullets with given properties.
			 * @param {STG.Bullet[]} - An array of STG bullets.
			 * @param {Object} - An object containing the x and y coordinate.
			 * @
			 */
			function compositior(options) {
				var bullets = options.bullets;
				var position = options.position;
				var max_bullets = options.max_bullets;
				var ctx = options.ctx;
				var colors = options.colors || ['green'];
				var radii = options.radii || [10];
				var is_opens = options.is_opens || [false];
				
				var indices = {
					color: {value: 0, length: colors.length},
					radius: {value: 0, length: radii.length},
					is_open: {value: 0, length: is_opens.length},
				};
				
				for (var bullet = 0; bullet < max_bullets; bullet++) {
					bullets.push(new stg.Bullet({
						x: position.x,
						y: position.y,
						color: colors[indices.color.value],
						ctx: ctx,
						radius: radii[indices.radius.value],
						is_open: is_opens[indices.is_open.value]
					}));
					
					for (var index in indices)
						if (++indices[index].value === indices[index].length)
							indices[index].value = 0;
				}

			}
			
		};
		
		return this.state;
	};
	
	return Pattern;
}(FSM, STG, Resource));