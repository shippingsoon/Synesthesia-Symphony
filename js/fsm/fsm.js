/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
	@version - v0.04
	@license - GPLv3
*/

var FSM = FSM || {};

//Finite state machine.
FSM.Init = (function(globals, stg) {
	"use strict";
	
	/*
	 * Handles states.
	 * @param {Object} options - TBA options for our state machine.
	 */
	function Init(options) {
		//An array of states.
		var states = [];
		
		//Canvas.
		var canvas = options.canvas || document.createElement('canvas');
		this.ctx = getScreenContext(); //options.context || canvas.getContext('2d');
		var that = this;
		
		//If a canvas element is not found append one.
		if (document.getElementsByTagName('canvas').length === 0)
			document.body.appendChild(canvas);
		
		/*
		 * Handle events in the current state.
		 * @param {Number} event - Numeric event code.
		 */
		this.controller = function(event) {
			if (states.length !== 0 && event) {
				//Handle events in the current state.
				_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'controller', event: event});
			}
		};
		
		/*
		 * Handle logic in the current state.
		 */
		this.update = function() {
			if (states.length !== 0) {
				//Update the current state.
				_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'update'});
			}
		};
		
		/*
		 * Render the current state.
		 */
		this.render = function() {
			if (states.length !== 0) {
				//Clear the canvas.
				this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

				//Render the current state.
				_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'render'});
			}
		};
		
		/*
		 * Pushes a new state on to the stack.
		 * @param {Object||FSM.state} state - A state to be processed.
		 */
		this.forward = function(state) {
			//Pause the current state.
			if (states.length !== 0)
				_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'pause'});
			
			//Push a new state and invoke its constructor.
			states.push(state);
			
			//Initiate the current state.
			_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'start'});
		};
		
		/*
		 * Pops a state from the stack.
		 * @param {Boolean} pause - Determines if we will pause the state before switching to a previous state.
		 */
		this.rewind = function(pause) {
			if (states.length !== 0) {
				//Determine if we will pause the current state.
				if (pause)
					_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'stop'});
				
				//Pop the current state.
				states.pop();
				
				//Resume the previous state.
				_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'play'});
			}
		};
		
		/*
		 * Transitions from one state to the next.
		 * @param {Object||FSM.state} state - A state to be processed.
		 */
		this.transition = function(state) {
			if (states.length !== 0) {
				//Stop the current state.
				_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'stop'});
				
				//Remove the state.
				states.pop();
			}
			
			//Transition into a new state by pushing a new state onto the stack.
			states.push(state);
			
			//Initiate the state.
			_fsm({fsm: that, ctx: that.ctx, state: states[states.length - 1], method: 'start'});
		};
		
		/*
		 * Recursively processes a states.
		 * @param {Object||FSM.state} options.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {String} method - The name of the method to call.
		 */
		function _fsm(options) {
			var _method = options.method;
			delete options._method;
			
			//Process the current state.
			if (options.state.hasOwnProperty(_method))
				options.state[_method](options);
				
			//Retrieve the substates.
			var substates = options.state.getSubstates();
			
			//Process the current substate and recursively process its substates.
			for (var substate = 0; substate < substates.length; substate++) {
				options['method'] = _method;
				options['state'] = substates[substate];
				_fsm(options);
			}
		}
	}
	
	/*
	 * Sets properties for the screen layer and returns a 2D context.
	 * @param {Object||Canvas} canvases - An array of canvases.
	 */
	function getScreenContext() {
		//Set our screen canvas layer.
		var screen_layer = document.getElementById('screen-layer');
		
		//Set the width and height of our sprite layer.
		screen_layer.width = stg.Config.CANVAS_WIDTH;
		screen_layer.height = stg.Config.CANVAS_HEIGHT;
		
		return screen_layer.getContext('2d')
	}
	
	return Init;
}(window, STG));