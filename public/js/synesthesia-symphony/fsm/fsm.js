/*
 * @description - Finite state machine.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Finite-State-Machine/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var STG = STG || {};
var Resource = Resource || {};

/*
 * Finite state machine.
 * @param {Object} globals - Explicit global namespace.
 * @param {STG} stg - Miscellaneous game module.
 * @param {Object} resource - Resource module.
 * @return {Function}
 */
var FSM = (function(globals, stg, resource) {
	'use strict';
	
	/*
	 * Handles states.
	 * @param {Object} options - TBA options for our state machine.
	 * @return {Undefined}
	 */
	function Init(options) {
		//An array of states.
		var states = [];
		
		//Reference to the current object.
		var that = this;
		
		//The parent of the current state.
		var parent = null;
		
		/*
		 * Handle events in the current state.
		 * @param {Number} event - Numeric event code.
		 * @return {Undefined}
		 */
		this.controller = function(event) {
			if (states.length !== 0 && event) {
				var current_state = currentState();
				
				//Handle events in the current state.
				if (current_state && current_state.isActive())
					_fsm({fsm: that, ctx: resource.layers.screen.getContext(), state: current_state, method: 'controller', event: event});
			}
		};
		
		/*
		 * Handle logic in the current state.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 * @return {FSM}
		 */
		this.update = function(fsm) {
			if (states.length !== 0) {
				var current_state = currentState();
				
				//Update the current state.
				if (current_state && current_state.isActive())
					_fsm({fsm: that, ctx: fsm.ctx, state: current_state, method: 'update'});
			}
			
			return that;
		};
		
		/*
		 * Render the current state.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 * @return {FSM}
		 */
		this.render = function(fsm) {
			if (states.length !== 0) {
				var current_state = currentState();
				
				//Render the current state.
				if (current_state && current_state.isVisible())
					_fsm({fsm: that, ctx: fsm.ctx, state: current_state, method: 'render'});
			}
			
			return that;
		};
		
		/*
		 * Pushes a new state on to the stack.
		 * @param {FSM.State} fsm.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 * @return {FSM}
		 */
		this.forward = function(fsm) {
			//Pause the current state.
			if (states.length !== 0 && fsm.pause !== false)
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'pause'});
			
			//Push a new state and invoke its constructor.
			states.push(fsm.state);
			
			//Initiate the new state.
			if (!fsm.skip)
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'start'});
			
			return that;
		};
		
		/*
		 * Pops a state from the stack.
		 * @param {Boolean} fsm.pause - Determines if we will pause the state before switching to a previous state.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 * @return {FSM}
		 */
		this.rewind = function(fsm) {
			if (states.length !== 0) {
				//Determine if we will pause the current state.
				if (fsm.stop)
					_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'stop'});
					
				//Pop the current state.
				states.pop();
				that.cleanState();
				
				//Resume the previous state.
				if (!fsm.skip)
					_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'play'});
			}
			
			return that;
		};
		
		/*
		 * Transitions from one state to the next.
		 * @param {FSM.State} fsm.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} fsm.ctx - Provides the 2D rendering context.
		 * @return {FSM}
		 */
		this.transition = function(fsm) {
			//Filter out inactive states.
			that.cleanState();
			
			if (states.length !== 0) {
				//Stop the current state.
				_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'stop'});
				
				//Remove the state.
				states.pop();
			}
			
			//Transition into a new state by pushing a new state onto the stack.
			states.push(fsm.state);
			
			if (fsm.parent || fsm.state.getParent())
				that.setParent(fsm.parent || fsm.state.getParent());
			
			//Initiate the state.
			_fsm({fsm: that, ctx: fsm.ctx, state: states[states.length - 1], method: 'start'});
			
			return that;
		};
		
		/*
		 * Adds a substate to the current state.
		 * @param {FSM.State} options.substate - A state to be processed.
		 * @param {Object} options.parent - The parent of this substate.
		 * @return {FSM}
		 */
		this.setSubstate = function(options) {
			if (states.length !== 0) {
				//Set the current state's substate.
				if (options.substate)
					states[states.length - 1].setSubstate({substate: options.substate, parent: options.parent});
			}
			
			return that;
		};
		
		/*
		 * Retrieves the current state.
		 * @return {FSM.State}
		 */
		 function currentState() {
			return states[states.length - 1];
		 }
		 
		/*
		 * Filters out dead states and substates.
		 * @return {FSM}
		 */
		this.cleanState = function() {
			states = states.filter(function(state) {
				//Filter out dead substates.
				if (state.isAlive())
					state.cleanSubstate();

				return state.isAlive();
			});
			
			return that;
		};
		
		/*
		 * Set the parent of the current state.
		 * @param {Object} _parent - The parent of the current state.
		 * @return {FSM}
		 */
		this.setParent = function(_parent) {
			parent = _parent;
			
			return that;
		}
		
		/*
		 * Get the parent of the current state.
		 * @return {FSM.State}
		 */
		this.getParent = function() {
			return parent;
		}
		
		/*
		 * Recursively processes a state and its substates.
		 * @param {FSM.State} options.state - A state to be processed.
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {String} options.method - The name of the method to call.
		 * @return {Undefined}
		 */
		function _fsm(options) {
			var callback = null;
			
			if (options.state) {
				if (options.state.isAlive()) {
					//Process the current state.
					if (options.state[options.method])
						callback = options.state[options.method](options);
					
					//Retrieve the substates.
					var substates = options.state.getSubstate();
					
					//Process the current substate and recursively process its substates.
					for (var substate = 0, length = substates.length; substate < length; substate++) {
						options['state'] = substates[substate];
						_fsm(options);
					}
					
					//Invoke the callback.
					if (callback && callback instanceof Function)
						callback();
				}
			}
		}
		
		/*
		 * Manually initiate a state.
		 * @return {FSM.State}
		 */
		this.run = function(options) {
			_fsm({state: options.state, ctx: options.ctx, method: 'start'});
			return that;
		}
		
		//Filter out dead states.
		setInterval(function(){
			that.cleanState();
		}, 300);
	}
	
	return Init;
}(window, STG, Resource));