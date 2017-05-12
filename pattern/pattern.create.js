/*
 * @description - Pattern submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};
var Pattern = Pattern || {};

/*
 * Pattern submodule.
 * @param {Object} globals - Explicit global namespace.
 * @param {FSM} fsm - Finite state machine.
 * @param {Pattern} pattern - Pattern module.
 * @return {Function}
 */
Pattern.Create = (function(globals, fsm, pattern) {
	'use strict';
	
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
	 * @param {Number} options.target_type - The target type. Set to 0 to retrieve the player and 1 to retrieve enemies.
	 * @return {Undefined}
	 */
	function Create(options) {
		//A reference to the current object.
		var that = this;
		
		//The 2D rendering context.
		var ctx = options.ctx || null;
		
		//The pattern's state.
		var state = new fsm.State(options);
		
		//The initial delay in fire in milliseconds.
		var delay = options.delay || 0;
		
		//The rate of fire in milliseconds.
		var rate = (options.rate === undefined) ? 1000 : options.rate;
		
		//Determines if we can fire.
		var can_fire = (!delay);
		
		//The amount of times we can fire.
		var duration = options.duration || 10000000;
		
		//The pattern method we will be invoking.
		var method = options.method || 'Circular';
		
		//The parent of this state.
		var parent = state.getParent();
		
		//The angle of the bullets.
		var degrees  = options.degrees || 0;
		
		//The rate in degrees we will rotate the bullets.
		var rotation  = options.rotation || 0;
		
		//Determines if bullets will be fired automatically.
		var auto_fire = (options.auto_fire || options.auto_fire === undefined);
		
		//An event to halt firing.
		var colors = options.colors || ['green'];
		
		/*
		 * Initiate this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.start = function(game) {
			if (!can_fire)
				globals.setTimeout(setFire, delay, true);
			
			parent = state.getParent();
		};
		
		/*
		 * Handle game logic for this state.
		 * @param {FSM} game.fsm - Finite state machine.
		 * @param {CanvasRenderingContext2D} game.ctx - Provides the 2D rendering context.
		 * @return {Undefined}
		 */
		state.update = function(game) {
			options.fsm = game.fsm;
			options.degrees = degrees;
			options.ctx = ctx || game.ctx;
			options.colors = colors;
			
			if (parent)
				options.position = parent.getPosition();
			
			if (can_fire && auto_fire && duration--) {
				pattern[method](options);
				
				if (rate) {
					can_fire = false;
					globals.setTimeout(setFire, rate, true);
				}
				
				degrees += rotation;
			}
			
			if (!duration)
				state.setAlive(false);
		};
		
		/*
		 * Changes the fire state.
		 * @param {Boolean} _can_fire - Determines if we can fire.
		 * @return {Undefined}
		 */
		function setFire(_can_fire) {
			can_fire = _can_fire;
		}
		
		/*
		 * Changes the auto fire state.
		 * @param {Boolean} _auto_fire - Determines if shots are fired automatically.
		 * @return {Undefined}
		 */
		this.setAutoFire = function(_auto_fire) {
			auto_fire = _auto_fire;
		};
		
		/*
		 * Changes the pattern's colors.
		 * @param {STG.Color[]|String[]} _colors - An array of colors.
		 * @return {Undefined}
		 */
		this.setColors = function(_colors) {
			colors = _colors;
		};
		
		/*
		 * Get the state.
		 * @return {FSM.State}
		 */
		this.getState = function() {
			return state;
		};
	};
	
	return Create;
}(window, FSM, Pattern));