/*
 * @description - Timer submodule.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

/*
 * Timer submodule.
 * @param {Object} globals - Explicit global namespace.
 * @return {Function}
 */
STG.Timer = (function(globals) {
	'use strict';
	
	/*
	 * The Timer submodule allows javascript's setTimeout function to be paused and resumed.
	 * @param {Function} options.callback - The function to call after the delay.
	 * @param {Number} options.delay - The delay in milliseconds.
	 * @param {Object[]} options.argv - An array of arguments to pass to the callback.
	 * @param {Boolean} options.auto_start - Determines if the timer will start immediately.
	 * @return {Undefined}
	 */
	function Timer(options) {
		//A reference to the current object.
		var that = this;
		
		//The function to call after the delay.
		var callback = (options.callback) ? options.callback : arguments[0];
		
		//The delay in milliseconds.
		var delay = (typeof options.delay === 'number') ? options.delay : arguments[1];
		
		//The setTimeout ID. This ID will be used to clear the setTimeout event.
		var id = null;
		
		//The change in time from when the timer was first paused and resumed.
		var delta_time = new Date();
		
		//The arguments to pass to the callback.
		var argv = (options.argv && options.argv.constructor === Array) ? options.argv : [];
		
		//Store the variable arguments list into an array. This array will be passed to the callback.
		if (!options.argv && argv.length === 0 && arguments.length > 1) {
			//The argv array will now contain the extra variable amount of arguments passed to the Timer constructor.
			for (var argument = 2; argument < arguments.length; argument++)
				argv[argument - 2] = arguments[argument];
		}
		
		/*
		 * Resume the timer.
		 * @return {Undefined}
		 */
		this.play = function() {
			//We will use the change in this time to 
			delta_time = new Date();
			
			//Clear any persistent timers.
			that.stop();
			
			//Set the time out.
			id = globals.setTimeout(function() {
				//Invoke the callback with the given arguments.
				callback.apply(callback, argv);
			}, delay);
			
			return that;
		};
		
		/*
		 * Pause the timer.
		 * @return {Undefined}
		 */
		this.pause = function() {
			that.stop();
			
			delay = delay - (new Date().getTime() - delta_time.getTime());
			
			return that;
		};
		
		/*
		 * Stop the timer.
		 * @return {Undefined}
		 */
		this.stop = function() {
			//Remove the time out.
			if (id !== null) {
				globals.clearTimeout(id);
				id = null;
			}
			
			return that;
		};
		
		/*
		 * Get the timer ID.
		 * @return {Number}
		 */
		this.getId = function() {
			return id;
		};
		
		/*
		 * Set the timer's delay.
		 * @param {Number} _delay - The timer's delay in milliseconds.
		 * @return {Undefined}
		 */
		this.setDelay = function(_delay) {
			delay = _delay;
			
			return that;
		};
		
		/*
		 * Get the timer's delay.
		 * @return {Number}
		 */
		this.getDelay = function() {
			return delay;
		};
		
		/*
		 * Set the timer's callback.
		 * @param {Function} _callback - The timer's callback.
		 * @return {Undefined}
		 */
		this.setCallback = function(_callback) {
			callback = _callback;
			
			return that;
		};
		
		/*
		 * Get the timer's callback.
		 * @return {Function}
		 */
		this.getCallback = function() {
			return callback;
		};
		
		//Start the timer.
		if (options.auto_start)
			this.play();
	};
	
	return Timer;
}(window));