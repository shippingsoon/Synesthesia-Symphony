/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.04
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
				_fsm({fsm: that, ctx: resource.layers.screen.ctx, state: states[states.length - 1], method: 'controller', event: event});
			}
		};
		
		/*
		 * Handle logic in the current state.
		 */
		this.update = function(fsm) {
			if (states.length !== 0) {
				//Update the current state.
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'update'});
			}
		};
		
		/*
		 * Render the current state.
		 */
		this.render = function(fsm) {
			if (states.length !== 0) {
				//Clear the canvas.
				if (states[states.length - 1] && states[states.length - 1].clear === true)
					fsm.ctx.clearRect(0, 0, fsm.ctx.canvas.width, fsm.ctx.canvas.height);

				//Render the current state.
				var callback = _fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'render'});
				
				if (callback instanceof Function)
					callback();
			}
		};
		
		/*
		 * Pushes a new state on to the stack.
		 * @param {Object||FSM.state} state - A state to be processed.
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
		 * @param {Boolean} pause - Determines if we will pause the state before switching to a previous state.
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
		 * @param {Object||FSM.state} state - A state to be processed.
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
		 * @param {Object||FSM.state} options.substate - A state to be processed.
		 * @param {Object||FSM.state} options.parent - The parent of this substate.
		 */
		this.setSubstate = function(options) {
			if (states.length !== 0) {
				//Set the current state's substate.
				if (options.substate)
					states[states.length - 1].setSubstate(options.substate, options.parent);
			}
		};
		
		/*
		 * Filters out inactive states and substates.
		 */
		this.cleanState = function() {
			states = states.filter(function(state) {
				//Filter out inactive substates.
				state.cleanSubstate();

				return state.isActive();
			});
		};
		
		/*
		 * Recursively processes a states.
		 * @param {Object||FSM.state} options.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {String} options.method - The name of the method to call.
		 */
		function _fsm(options) {
			var callback = null;
			
			if (options.state) {
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
			
			return callback;
		}
	}
	
	return Init;
}(window, STG, Resource));