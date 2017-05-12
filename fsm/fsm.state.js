/*
 * @description - Finite state machine.
 * @copyright - 2014 Shipping Soon
 * @source - https://github.com/shippingsoon/Finite-State-Machine/
 * @website - https://www.shippingsoon.com/synesthesia-symphony/
 * @version - v0.06
 * @license - GPLv3
 */

var FSM = FSM || {};

/*
 * State
 * @return {Function}
 */
FSM.State = (function() {
	'use strict';
	
	/*
	 * A state. We can define the polymorphic methods of this state via the parameters.
	 * @param {Function} options.start - The state's constructor.
	 * @param {Function} options.stop - The state's deconstructor.
	 * @param {Function} options.play - Resume the state.
	 * @param {Function} options.pause - Pause the state.
	 * @param {Function} options.controller - Handle the events of this state.
	 * @param {Function} options.update - Handle events and logic of this state.
	 * @param {Function} options.render - Handle the rendering routines of this state.
	 * @param {Object} options.parent - The parent of this state. This will be used by substates to access properties of their parent state.
	 * @return {Undefined}
	 */
	function State(options) {
		//A reference to the current object.
		var that = this;

		//Determines if the state is visible.
		var visible = true;
		
		//Determines if the state is active.
		var active = true;
		
		//Determines if the state is alive. If this is set to false references to this state will be removed for garbage collection.
		var alive = true;
		
		//An array of substates.
		var substates = [];
		
		//The state's constructor.
		this.start = options.start || null;
		
		//The state's deconstructor.
		this.stop = options.stop || null;
		
		//Resume the state.
		this.play = options.play || null;
		
		//Pause the state.
		this.pause = options.pause || null;
		
		//Handle the events of this state.
		this.controller = options.controller || null;
		
		//Handle events and logic of this state.
		this.update = options.update || null;
		
		//Handle the rendering routines of this state.
		this.render = options.render || null;
		
		//The parent of this state.
		var parent = options.parent || null;
		
		/*
		 * Add a substate.
		 * @param {FSM.State} options.substate - The substate.
		 * @param {Object} options.parent - The object who created this substate.
		 * @param {FSM} options.fsm - Finite state machine
		 * @param {CanvasRenderingContext2D} options.ctx - Provides the 2D rendering context.
		 * @param {Boolean} options.start_state - Determines if we will initiate this substate.
		 * @return {Undefined}
		 */
		this.setSubstate = function(options) {
			if (options.substate) {
				if (!(options.substate instanceof State))
					throw 'Not a state';
					
				substates.push(options.substate || options.state);
			
				//Set the parent of this substate.
				if (options.parent !== undefined)
					options.substate.setParent(options.parent);
				
				//Optionally initiate the substate.
				if (options.fsm && options.start_state)
					options.fsm.run({state: substate, ctx: options.ctx || fsm.ctx});
			}
		};
		
		/*
		 * Retrieve a substate.
		 * @param {Number} index - The array index of the substate to retrieve.
		 * @return {FSM.State|FSM.State[]}
		 */
		this.getSubstate = function(index) {
			//If we were given an index return the substate at the given index.
			if (index !== undefined && index < substates.length)
				return substates[index];
			
			return substates;
		}
		
		/*
		 * Set the parent of this state.
		 * @param {Object} _parent - The parent of this state.
		 * @return {Undefined}
		 */
		this.setParent = function(_parent) {
			parent = _parent;
		}
		
		/*
		 * Get the parent of this state.
		 * @return {FSM.State}
		 */
		this.getParent = function() {
			return parent;
		}
		
		/*
		 * Sets a state's active status.
		 * @param {Boolean} is_active - Determines if the active status will be true or false.
		 * @return {Undefined}
		 */
		this.setActive = function(is_active) {
			active = is_active;
		};
		
		/*
		 * Checks if this state is still active.
		 * @return {Boolean}
		 */
		this.getActive = this.isActive = function() {
			return active;
		};
		
		/*
		 * Sets a state's alive status.
		 * @param {Boolean} is_alive - Determines if the alive status will be true or false.
		 * @return {Undefined}
		 */
		this.setAlive = function(is_alive) {
			alive = is_alive;
		};
		
		/*
		 * Checks if this state is still alive.
		 * @return {Boolean}
		 */
		this.getAlive = this.isAlive = function() {
			return alive;
		};
		
		/*
		 * Sets a state's visible status.
		 * @param {Boolean} is_visible - Determines if the visible status will be true or false.
		 * @return {Undefined}
		 */
		this.setVisible = function(is_visible) {
			visible = is_visible;
		};
		
		/*
		 * Checks if this state is visible.
		 * @return {Boolean}
		 */
		this.getVisible = this.isVisible = function() {
			return visible;
		};
		
		/*
		 * Filters out dead substates.
		 * @return {Undefined}
		 */
		this.cleanSubstate = function() {
			if (substates.length !== 0) {
				substates = substates.filter(function(state) {
					//Filter out dead substates.
					return state.isAlive();
				});
			}
		};
	}
	
	return State;
}());