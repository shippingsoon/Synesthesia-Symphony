/*
	@description - Synesthesia Symphony
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

var System = System || {};
var Resource = Resource || {};

 /*
  * Main function.
  * @param {Object} globals - Explicit global namespace.
  * @param {Object} system - Synesthesia Symphony's primary module.
  * @param {Object} $ -jQuery library.
  */
(function(globals, system, resource, $) {
	//Load the game resources.
	resource.load(null);
	
	//Retrieve our canvas elements.
	var layers = resource.layers;
	
	//Initiate our state machine.
	var game = new FSM.Init({});
	
	//Transition into the intro state.
	game.transition({state: new FSM.Stage({}), ctx: layers.screen.ctx});

	//Main function.
	function main() {
		//Handle events of the current state.
		game.controller({ctx: layers.screen.ctx});
		
		//Handle logic of the current state.
		game.update({ctx: layers.screen.ctx});
		
		//Render the current state.
		game.render({ctx: layers.screen.ctx});
	};
	
	//If online mode is enabled load a session.
	if (system.Config.online)
		Session.load(main);
	else
		//Call our main function every n frames per second.
		globals.interval = setInterval(main, (1000 / system.Config.FPS));
}(window, System, Resource, jQuery));
