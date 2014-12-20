/*
	@description - Danmaku
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/TBA
	@website - https://www.shippingsoon.com/
	@version - v0.01
	@license - GPLv3
*/

 /*
  * Main function.
  * @param {Object} globals - Explicit global namespace.
  * @param {Object} stg - Danmaku's primary module.
  * @param {Object} $ -jQuery library.
  */
$(document).ready(function(){
  (function(globals, stg, $) {
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
	
	//Call our main function every n frames per second.
	globals.interval = setInterval(main, (1000 / stg.Config.FPS));
}(window || {}, STG, jQuery));

})