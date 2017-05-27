/*
 * @description - This is an interface for a game state.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.ts" />

namespace Symphony.System {
	/**
	 * Game state abstract class.
	 */
	export abstract class State {
		//Determines if this state is active i.e., if we will invoke the update() method.
		protected _isActive:boolean = true;

		//Determines if the state is visible i.e., if we will invoke the draw() method.
		protected _isVisible:boolean = true;

		/**
		 * @constructor
		 */
		constructor(){
			this._isActive = true;
			this._isVisible = true;
		}

		///#region Polymorphism Region (Note: regions are collapsible with IntelliJ)

		/**
		 * Handles logic for the state.
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @return {void}
		 */
		public abstract update(data:StateData):void;

		/**
		 * Renders the state.
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @return {void}
		 */
		public abstract draw(data:StateData):void;

		/**
		 * This method contains logic that is invoked when the state is pushed on the FSM stack. It can be thought of as a constructor.
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @return {void}
		 */
		public abstract start(data:StateData):void;

		/**
		 * This method contains logic that is invoked when the state is popped from the FSM stack. It can be thought of as a destructor.
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @return {void}
		 */
		public abstract stop?(data:StateData):void;

		/**
		 * Resumes the state.
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @return {void}
		 */
		public abstract play?(data:StateData):void;

		/**
		 * Suspends the state but does not remove from the FSM stack.
		 * @param {System.StateData} data - An object containing the 2D drawing context and delta time.
		 * @return {void}
		 */
		public abstract pause?(data:StateData):void;

		///#endregion
		///#region Getter/Setter Region (Note: regions are collapsible with IntelliJ)

		/**
		 * Gets the isActive status.
		 * @return {boolean}
		 */
		public get isActive() {
			return this._isActive;
		}

		/**
		 * Gets the isActive status.
		 * @param _isActive
		 */
		public set isActive(_isActive:boolean) {
			this._isActive = _isActive;
		}

		/**
		 * Gets the isActive status.
		 * @return {boolean}
		 */
		public get isVisible() {
			return this._isVisible;
		}

		/**
		 * Gets the isVisible status.
		 * @param _isVisible
		 */
		public set isVisible(_isVisible:boolean) {
			this._isVisible = _isVisible;
		}

		///#endregion
	}

	/**
	 * The data structure we will pass to the finite state machine.
	 * @interface
	 */
	export interface StateData {
		//HTML5 2D rendering context.
		ctx?:CanvasRenderingContext2D;

		//A game state.
		state?:System.State;

		//System session.
		session?:System.Session;

		//Delta time. The time difference from the current and previous game state.
		dt?:number;

		//Determines if we will pause the state.
		pause?:boolean;
	}
}

