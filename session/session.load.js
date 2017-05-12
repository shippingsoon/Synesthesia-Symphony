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
	 * Invokes the main function in intervals.
	 * @param {Object} data - The data we will use to initiate the system configuration submodule.
	 * @return {Undefined}
	 */
	function startSession(data) {
		//Load the session.
		session.init(data);
		
		//Initiate the resources.
		resource.init(system.resolution_idx);
		
		//2D rendering context.
		var ctx = resource.layers.screen.getContext();
		
		//The targeted frames per second.
		var FPS = (1000 / system.Config.TARGET_FPS);
		
		//Initiate the finite state machine.
		system.fsm = new fsm({});
		
		//Transition into the load state.
		system.fsm.transition({state: new fsm.Load({}).getState(), ctx: ctx});

		//Call the main function every n frames per second.
		globals.interval = setInterval(function() {
			system.main(system.fsm, ctx);
		}, FPS);
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
					if (system.Config.DEBUG_MODE)
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