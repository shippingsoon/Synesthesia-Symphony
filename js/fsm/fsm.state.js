/*
	@description - Finite state machine.
	@copyright - 2014 Shipping Soon
	@source - https://github.com/shippingsoon/Finite-State-Machine/
	@website - https://www.shippingsoon.com/
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

		//Determines if we will clear the canvas during the rendering process.
		this.clear = options.clear || false;
		
		//Determines if the state is visible.
		var visible = true;
		
		//Determines if the state is active.
		var active = true;
		
		//An array of substates.
		var substates = [];
		
		//The state's constructor.
		this.start = options.start || new Function;
		
		//The state's deconstructor.
		this.stop = options.stop || new Function;
		
		//Resume the state.
		this.play = options.play || new Function;
		
		//Pause the state.
		this.pause = options.pause || new Function;
		
		//Handle the events of this state.
		this.controller = options.controller || new Function;
		
		//Handle events and logic of this state.
		this.update = options.update || new Function;
		
		//Handle the rendering routines of this state.
		this.render = options.render || new Function;
		
		//The parent of this state.
		var parent = null;
		
		//The parent state.
		var parentState = null;
		
		//Add a substate.
		this.setSubstate = function(substate, parent) {
			substates.push(substate);
			
			//Set the parent of this state.
			if (parent !== undefined)
				substate.setParent(parent);
			
			//Set the parent state of the substate.
			substate.setParentState(this);
		};
		
		//Retrieve a substate.
		this.getSubstate = function(index) {
			if (index === undefined)
				return substates;
			return substates[index];
		};
		
		//Set the parent of this state.
		this.setParent = function(creator) {
			parent = creator;
		}
		
		//Get the parent of this state.
		this.getParent = function() {
			return parent;
		}
		
		//Set the parent state of a substate.
		this.setParentState = function(state) {
			parentState = state;
		}
		
		//Get the parent state of a substate.
		this.getParentState = function() {
			return parent;
		}
		
		//Sets a state's active status.
		this.setActive = function(make_active) {
			if (make_active !== undefined)
				active = (make_active === true);
		};
		
		//Checks if this state is still active.
		this.getActive = this.isActive =  function() {
			return active;
		};

		//Filters out inactive substates.
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