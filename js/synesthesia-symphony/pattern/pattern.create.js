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
var Pattern = Pattern || {};

//Pattern submodule.
Pattern.Create = (function(globals, fsm, stg, resource, pattern) {
	"use strict";
	
	var layers = resource.layers;
	
	/*
	 * Pattern constructor.
	 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
	 * @param {Number} options.padding - The margin between bullets.
	 * @param {Number} options.degrees - The angle of the initial bullet.
	 * @param {Number} options.rotation - The rate in degrees we will rotate the bullets.
	 * @param {Number} options.duration - The amount to fire.
	 * @param {Number} options.rate - The rate of fire in milliseconds.
	 * @param {Number} options.delay - The initial delay for the first shot in milliseconds.
	 * @param {Object} options.position - An x and y coordinate for the initial position of the bullet.
	 * @param {Object} options.offsets - An x and y coordinate for how much we will offset the bullet.
	 * @param {Number} options.max_bullets - The number of bullets to create.
	 * @param {Number[]} options.speeds - An array of speeds. Low numbers are preferred.
	 * @param {STG.Colors[]|String[]} options.colors - An array of STG colors or strings.
	 * @param {Number[]} options.radii - An array circle radii.
	 * @param {Boolean[]} options.is_opens - Determines if a bullet will leave paint trails.
	 * @param {Boolean} options.invert - Flips about the y-axis.
	 */
	function Create(options) {
		//A reference to the current object.
		var that = this;
		
		//The 2D rendering context.
		var ctx = options.ctx || null;
		
		//The pattern's state.
		this.state = new fsm.State(options);
		
		//The initial delay in fire in milliseconds.
		var delay = options.delay || 0;
		
		//The rate of fire in milliseconds.
		var rate = options.rate || 1000;
		
		//Determines if we can fire.
		var can_fire = (!delay);
		
		//The amount of times we can fire.
		var duration = options.duration || 10000;
		
		//The pattern method we will be invoking.
		var method = options.method || 'Circular';
		
		//The parent of this state.
		var parent = this.state.getParent();
		
		//The angle of the bullets.
		var degrees  = options.degrees || 0;
		
		//The rate in degrees we will rotate the bullets.
		var rotation  = options.rotation || 0;
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.start = function(game) {
			if (!can_fire)
				globals.setTimeout(setFire, delay, true);
			
			parent = that.state.getParent();
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 */
		this.state.update = function(game) {
			options.fsm = game.fsm;
			options.degrees = degrees;
			options.ctx = ctx || game.ctx;
			
			if (parent)
				options.position = parent.getPosition();
			
			if (can_fire && duration--) {
				pattern[method](options);
				
				if (rate) {
					can_fire = false;
					globals.setTimeout(setFire, rate, true);
				}
				
				degrees += rotation;
			}
			
			if (!duration)
				that.state.setAlive(false);
		};
		
		/*
		 * Changes the fire state.
		 * @param {Boolean} _can_fire - Determines if we can fire.
		 */
		function setFire(_can_fire) {
			can_fire = _can_fire;
		}
		
		return this.state;
	};
	
	return Create;
}(window, FSM, STG, Resource, Pattern));