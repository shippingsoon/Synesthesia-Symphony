/*
	@description - Synesthesia Symphony
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.01
	@license - GPLv3
*/

var System = System || {};
var Resource = Resource || {};
var FSM = FSM || {};

 /*
  * Main function.
  * @param {Object} globals - Explicit global namespace.
  * @param {Object} system - Synesthesia Symphony's primary module.
  * @param {Object} resource - Resource submodule.
  * @param {Object} fsm - Finite state machine.
  */
(function(globals, system, resource, fsm) {
	//Load the game resources.
	resource.load(null);
	
	//Retrieve our canvas elements.
	var layers = resource.layers;
	
	//Initiate our state machine.
	var game = new fsm.Init({});
	
	//Transition into the intro state.
	game.transition({state: new fsm.Stage({}), ctx: layers.screen.ctx});
	
	//Keep track of the delta time.
	var previous_time = new Date;
	var current_time = 0;
	
	//Main function. Todo: Use fixed times steps and requestAnimationFrame().
	function main() {
		//Handle events of the current state.
		game.controller({ctx: layers.screen.ctx});
		
		//Handle logic of the current state.
		game.update({ctx: layers.screen.ctx});

		//Render the current state.
		game.render({ctx: layers.screen.ctx});
		
		//Get the current time.
		current_time = new Date;
		
		//Set the average frames per second.
		system.Config.fps = 1000 / (current_time.getTime() - previous_time.getTime());
		
		//Set the previous time to the current time.
		previous_time = current_time;
	};
	
	//If online mode is enabled load a session.
	if (system.Config.ONLINE)
		Session.load(main);
	else
		//Call our main function every n frames per second.
		globals.interval = setInterval(main, 1000 / system.Config.TARGET_FPS);
}(window, System, Resource, FSM));
