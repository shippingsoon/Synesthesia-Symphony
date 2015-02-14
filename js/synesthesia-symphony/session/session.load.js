/*
 * @description - Synesthesia Symphony's session submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var System = System || {};
var Resource = Resource || {};
var FSM = FSM || {};
var Session = Session || {};

/*
 * This submodule loads a session from the server or from a submodule.
 * @param {Object} globals - Explicit global namespace.
 * @param {System} system - System module.
 * @param {Object} resource - Resource module.
 * @param {FSM} fsm - Finite state machine.
 * @param {Object} session - Session module.
 * @return {Function}
 */
Session.load = (function(globals, system, resource, fsm, session, $) {
	'use strict';

	/*
	 * Main function. Todo: Use fixed times steps and requestAnimationFrame().
	 * @return {Undefined}
	 */
	function main() {
		//The 2D rendering context.
		var ctx = resource.layers.screen.getContext();
		
		//Get the current time.
		var current_time = new Date;
		
		//The previous time.
		this.previous_time = this.previous_time || current_time;
		
		//Handle logic of the current state.
		system.fsm.update({ctx: ctx});

		//Render the current state.
		system.fsm.render({ctx: ctx});

		//Set the average frames per second.
		system.Config.fps = 1000 / (current_time.getTime() - this.previous_time.getTime());
		
		//Set the previous time to the current time.
		this.previous_time = current_time;
	};

	/*
	 * Invokes the main function in intervals.
	 * @param {Object} data - The data we will use to initiate the system configuration submodule.
	 * @return {Undefined}
	 */
	function startSession(data) {
		//Load the session.
		system.Config.hiscore = data.hiscore;
		system.Config.resolution.selection = data.resolution;
		system.Config.volume = data.volume;
		system.Config.bgm_volume = data.bgm_volume;
		system.Config.sfx_volume = data.sfx_volume;
		system.Config.show_fps = data.show_fps;
		
		//Initiate the resource submodule.
		resource.init();
		
		//Initiate our state machine.
		system.fsm = new fsm({});
		
		//Transition into the load state.
		system.fsm.transition({state: new fsm.Load({}).getState(), ctx: resource.layers.screen.getContext()});

		//Call our main function every n frames per second.
		globals.interval = setInterval(main, (1000 / system.Config.TARGET_FPS));
	}

	/*
	 * Loads a session from a server or from a submodule.
	 * @return {Undefined}
	 */
	function load() {
		//If we are online.
		if (system.Config.ONLINE) {
			$.ajax({
				type: 'POST',
				url: '/synesthesia-symphony/session/load',
				dataType: 'json',
				success: function(data) {
					//Use the returned data to initialize the system configuration submodule.
					startSession(data);
				},
				error: function(data) {
					if (system.Config.DEBUG)
						console.log('Error loading session', data);
					
					startSession(session.cache);
				}
			});
		}
		
		//If we are offline.
		else
			startSession(session.cache);
	}

	return load;
}(window, System, Resource, FSM, Session, jQuery));