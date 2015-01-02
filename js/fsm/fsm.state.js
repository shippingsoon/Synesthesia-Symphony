/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/synesthesia-symphony/
	@version - v0.04
	@license - GPLv3
*/

var FSM = FSM || {};

//State.
FSM.State = (function(globals) {
	"use strict";
	
	/*
	 * A state.
	 * @param {Object} options - Define the polymorphic methods of this state.
	 */
	function State(options) {
		//A reference to the current object.
		var that = this;

		//Determines if the state is visible.
		var visible = true;
		
		//Determines if the state is active. If this is set to false references to this state will be removed for garbage collection.
		var active = true;
		
		//Determines if we will clear the canvas during the rendering process.
		this.clear = options.clear || false;
		
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
		
		//The parent state.
		var parentState = options.parentState || null;
		
		/*
		 * Add a substate.
		 * @param {FSM.State} substate - The substate.
		 * @param {Object} parent - The object who created this substate.
		 * @param {FSM.State} parentState - The parent's state.
		 */
		this.setSubstate = function(substate, parent, parentState) {
			substates.push(substate);
			
			//Set the parent of this state.
			if (parent !== undefined)
				substate.setParent(parent);
			
			//Set the parent state of the substate.
			substate.setParentState(parentState || this);
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
		 * Set the parent state of a substate.
		 * @param {FSM.State} state - The state.
		 */
		this.setParentState = function(state) {
			parentState = state;
		}
		
		/*
		 * Get the parent state of a substate.
		 */
		this.getParentState = function() {
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
		 * Recursively filters out inactive substates.
		 */
		this.cleanSubstate = function() {
			if (substates.length !== 0) {
				substates = substates.filter(function(state) {
					//Recursively filter out inactive substates.
					state.cleanSubstate();
					
					return state.isActive();
				});
			}
		};
	}
	
	return State;
}(window));