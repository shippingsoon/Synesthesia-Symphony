/*
	@description - Synesthesia Symphony
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Synesthesia-Symphony
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

 /*
  * Main function.
  * @param {Object} globals - Explicit global namespace.
  * @param {Object} system - Synesthesia Symphony's primary module.
  * @param {Object} $ -jQuery library.
  */
var System = System || {};

(function(globals, system, $) {
	//Initiate our state machine.
	var game = new FSM.Init({});

	//Transition into the intro state.
	game.transition(new FSM.Stage({}));

	//Main function.
	function main() {
		//Handle events of the current state.
		game.controller();
		
		//Handle logic of the current state.
		game.update();
		
		//Render the current state.
		game.render();
	};
	
	//If online mode is enabled load a session.
	//if (system.Config.online)
	//	Session.load(main);
	//else
		//Call our main function every n frames per second.
		globals.interval = setInterval(main, (1000 / system.Config.FPS));
}(window, System, jQuery));

