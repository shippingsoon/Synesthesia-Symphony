/*
 * @description - Synesthesia Symphony's main function.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};

/*
 * Main function.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @param {Object} resource - Resource module.
 * @param {FSM} fsm - Finite state machine.
 * @return {Function}
 */
System.main = (function(globals, system) {
	'use strict';

	//The previous time.
	var previous_time = new Date;
	
	/*
	 * Main function. Todo: Use fixed times steps and requestAnimationFrame().
	 * @param {Object|FSM} fsm - Finite state machine.
	 * @param {CanvasRenderingContext2D} ctx - 2D rendering context.
	 * @return {Undefined}
	 */
	function main(fsm, ctx) {
		//Get the current time.
		var current_time = new Date;
		
		//Handle logic of the current state.
		fsm.update({ctx: ctx});

		//Render the current state.
		fsm.render({ctx: ctx});

		//Set the average frames per second.
		system.fps = 1000 / (current_time.getTime() - previous_time.getTime());
		
		//Set the previous time to the current time.
		previous_time = current_time;
	}

	return main;
}(window, System));