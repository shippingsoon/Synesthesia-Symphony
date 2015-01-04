/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.05
	@license - GPLv3
*/

var FSM = FSM || {};

//State.
FSM.State = (function(globals) {
	"use strict";
	
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
		 */
		this.setSubstate = function(options) {
			if (options.substate) {
				substates.push(options.substate);
			
				//Set the parent of this substate.
				if (options.parent !== undefined)
					substate.setParent(options.parent);
				
				//Optionally initiate the substate.
				if (options.fsm && options.start_state)
					options.fsm.run({state: substate, ctx: options.ctx || fsm.ctx});
			}
		};
		
		/*
		 * Retrieve a substate.
		 * @param {Number} index - The array index of the substate to retrieve.
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
		 */
		this.setParent = function(_parent) {
			parent = _parent;
		}
		
		/*
		 * Get the parent of this state.
		 */
		this.getParent = function() {
			return parent;
		}
		
		/*
		 * Sets a state's active status.
		 * @param {Boolean} is_active - Determines if the active status will be true or false.
		 */
		this.setActive = function(is_active) {
			active = is_active;
		};
		
		/*
		 * Checks if this state is still active.
		 */
		this.getActive = this.isActive =  function() {
			return active;
		};
		
		/*
		 * Sets a state's alive status.
		 * @param {Boolean} is_alive - Determines if the alive status will be true or false.
		 */
		this.setAlive = function(is_alive) {
			alive = is_alive;
		};
		
		/*
		 * Checks if this state is still alive.
		 */
		this.getAlive = this.isAlive =  function() {
			return alive;
		};
		
		/*
		 * Sets a state's visible status.
		 * @param {Boolean} is_visible - Determines if the visible status will be true or false.
		 */
		this.setVisible = function(is_visible) {
			active = is_visible;
		};
		
		/*
		 * Checks if this state is visible.
		 */
		this.getVisible = this.isVisible =  function() {
			return visible;
		};
		
		/*
		 * Recursively filters out dead substates.
		 */
		this.cleanSubstate = function() {
			if (substates.length !== 0) {
				substates = substates.filter(function(state) {
					//Recursively filter out dead substates.
					state.cleanSubstate();
					
					return state.isAlive();
				});
			}
		};
	}
	
	return State;
}(window));