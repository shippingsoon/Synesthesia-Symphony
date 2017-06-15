/**
 * @file Here we have an abstract class for game states. Game states are used by the finite state machine design pattern. See the FSM class in system.fsm.ts for more details.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { StateData } from './system';
import { Session } from './system.session';

/**
 * @class
 * @classdesc state abstract class.
 */
export abstract class State {
	//Determines if this state is active i.e., if we will invoke the update() method.
	protected _isActive: boolean = true;

	//Determines if the state is visible i.e., if we will invoke the draw() method.
	protected _isVisible: boolean = true;

	public constructor() {
		this._isActive = true;
		this._isVisible = true;
	}

	///#region Polymorphism Region (Note: regions are collapsible with IntelliJ)

	/**
	 * Handles logic for the state.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract update(data: StateData): void;

	/**
	 * Renders the state.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract draw(data: StateData): void;

	/**
	 * This method contains logic that is invoked when the state is pushed on the FSM stack. It can be thought of as a constructor.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract start(data: StateData): void;

	/**
	 * This method contains logic that is invoked when the state is popped from the FSM stack. It can be thought of as a destructor.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract stop?(data: StateData): void;

	/**
	 * Resumes the state.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract play?(data: StateData): void;

	/**
	 * Suspends the state but does not remove from the FSM stack.
	 * @param {StateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract pause?(data: StateData): void;

	/**
	 * Changes the state.
	 * @param {State} state
	 * @param {Session} session
	 */
	protected changeState(state: State, session: Session): void {
		window.dispatchEvent(new CustomEvent('pushState', {
			'detail': {
				state: state,
				session: session
			}
		}));
	}
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
	public set isActive(_isActive: boolean) {
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
	public set isVisible(_isVisible: boolean) {
		this._isVisible = _isVisible;
	}

	///#endregion
}
