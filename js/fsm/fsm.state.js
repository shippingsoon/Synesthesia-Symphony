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
		var that = this;
		
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
		this.setSubstates = function(substate, parent) {
			substates.push(substate);
			
			//Set the parent of this state.
			if (parent !== undefined)
				substate.setParent(parent);
			
			//Set the parent state of this state.
			substate.setParentState(this);
		};
		
		//Retrieve a substate.
		this.getSubstates = function(index) {
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
		
	}
	
	return State;
}(window));