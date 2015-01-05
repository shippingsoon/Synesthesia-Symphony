/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};
var STG = STG || {};
var Resource = Resource || {};

//Finite state machine.
FSM.Init = (function(globals, stg, resource) {
	"use strict";
	
	/*
	 * Handles states.
	 * @param {Object} options - TBA options for our state machine.
	 */
	function Init(options) {
		//An array of states.
		var states = [];
		
		//Canvas.
		var that = this;
		
		/*
		 * Handle events in the current state.
		 * @param {Number} event - Numeric event code.
		 */
		this.controller = function(event) {
			if (states.length !== 0 && event) {
				//Handle events in the current state.
				_fsm({fsm: that, ctx: resource.layers.screen.getContext().ctx, state: states[states.length - 1], method: 'controller', event: event});
			}
		};
		
		/*
		 * Handle logic in the current state.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 */
		this.update = function(fsm) {
			if (states.length !== 0) {
				//Update the current state.
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'update'});
			}
			
			//Filter out dead states.
			this.cleanState();
		};
		
		/*
		 * Render the current state.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 */
		this.render = function(fsm) {
			if (states.length !== 0) {
				var callback = null;
				var current_state = currentState();
				
				if (current_state && current_state.isVisible())
					//Render the current state.
					_fsm({fsm: that, ctx: fsm.ctx, state: current_state, method: 'render'});
			}
		};
		
		/*
		 * Pushes a new state on to the stack.
		 * @param {FSM.State} fsm.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 */
		this.forward = function(fsm) {
			//Pause the current state.
			if (states.length !== 0)
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'pause'});
			
			//Push a new state and invoke its constructor.
			states.push(fsm.state);
			
			//Initiate the current state.
			_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'start'});
		};
		
		/*
		 * Pops a state from the stack.
		 * @param {Boolean} fsm.pause - Determines if we will pause the state before switching to a previous state.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 */
		this.rewind = function(fsm) {
			if (states.length !== 0) {
				//Determine if we will pause the current state.
				if (fsm.pause)
					_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'stop'});
				
				//Pop the current state.
				states.pop();
				
				//Resume the previous state.
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'play'});
			}
		};
		
		/*
		 * Transitions from one state to the next.
		 * @param {FSM.State} fsm.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 */
		this.transition = function(fsm) {
			//Filter out inactive states.
			this.cleanState();
			
			if (states.length !== 0) {
				//Stop the current state.
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'stop'});
				
				//Remove the state.
				states.pop();
			}
			
			//Transition into a new state by pushing a new state onto the stack.
			states.push(fsm.state);
			
			//Initiate the state.
			_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'start'});
		};
		
		/*
		 * Adds a substate to the current state.
		 * @param {FSM.State} options.substate - A state to be processed.
		 * @param {Object} options.parent - The parent of this substate.
		 */
		this.setSubstate = function(options) {
			if (states.length !== 0) {
				//Set the current state's substate.
				if (options.substate)
					states[states.length - 1].setSubstate({substate: options.substate, parent: options.parent});
			}
		};
		
		/*
		 * Retrieves the current state.
		 */
		 function currentState() {
			return states[states.length - 1];
		 }
		 
		/*
		 * Filters out dead states and substates.
		 */
		this.cleanState = function() {
			states = states.filter(function(state) {
				//Filter out dead substates.
				state.cleanSubstate();

				return state.isAlive();
			});
		};
		
		/*
		 * Recursively processes a state and its substates.
		 * @param {FSM.State} options.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {String} options.method - The name of the method to call.
		 */
		function _fsm(options) {
			var callback = null;
			
			if (options.state) {
				if (options.state.isActive()) {
					//Process the current state.
					if (options.state[options.method] instanceof Function)
						callback = options.state[options.method](options);
						
					//Retrieve the substates.
					var substates = options.state.getSubstate();

					//Process the current substate and recursively process its substates.
					for (var substate = 0, length = substates.length; substate < length; substate++) {
						options['state'] = substates[substate];
						_fsm(options);
					}
				}
	
				//Invoke the callback.
				if (callback && callback instanceof Function)
					callback();
			}
		}
		
		/*
		 * Manually initiate a state.
		 */
		this.run = function(options) {
			_fsm({state: options.state, ctx: options.ctx, method: 'start'});
		}
	}
	
	return Init;
}(window, STG, Resource));