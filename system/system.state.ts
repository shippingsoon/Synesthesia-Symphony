/**
 * @file Here we have an abstract class for game states. Game states are used by the finite state machine design pattern. See the FSM class in system.fsm.ts for more details.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IStateData, IState, FSMEvents } from './system.types';
import { Session } from './system.session';

/**
 * @class
 * @classdesc state abstract class.
 * @abstract
 * @module State
 */
export abstract class State implements IState {
	/**
	 * Determines if this state is active i.e., if we will invoke the update() method.
	 * @protected
	 */
	protected _isActive: boolean = true;

	/**
	 * Determines if the state is visible i.e., if we will invoke the draw() method.
	 * @protected
	 */
	protected _isVisible: boolean = true;

	/**
	 * Dispatches a custom event.
	 * @protected
	 * @event emit
	 * @param {object} detail
	 * @return {void}
	 */
	public static emit(eventName: FSMEvents, detail: {readonly state?: IState, readonly session?: Session}, __window: any = window): void {
		__window.dispatchEvent(new CustomEvent(eventName, {'detail': detail}));
	}

	/**
	 * If the constructor is protected it cannot be instantiated outside of the class body, but it can be extended.
	 * @protected
	 */
	protected constructor(private _window: any = window) {
		this._isActive = true;
		this._isVisible = true;
	}

	///#region Polymorphism Region (Note: regions are collapsible with IntelliJ)

	/**
	 * Handles logic for the state.
	 * @public
	 * @abstract
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract update(data: IStateData): void;

	/**
	 * Renders the state.
	 * @public
	 * @abstract
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract draw(data: IStateData): void;

	/**
	 * This method contains logic that is invoked when the state is pushed on the FSM stack. It can be thought of as a constructor.
	 * @public
	 * @abstract
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract start(data: IStateData): void;

	/**
	 * This method contains logic that is invoked when the state is popped from the FSM stack. It can be thought of as a destructor.
	 * @public
	 * @abstract
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract stop?(data: IStateData): void;

	/**
	 * Resumes the state.
	 * @public
	 * @abstract
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract play?(data: IStateData): void;

	/**
	 * Suspends the state but does not remove from the FSM stack.
	 * @public
	 * @abstract
	 * @param {IStateData} data - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract pause?(data: IStateData): void;

	///#endregion

	///#region Getter/Setter Region (Note: regions are collapsible with IntelliJ)

	/**
	 * Gets the isActive status.
	 * @public
	 * @return {boolean}
	 */
	public get isActive() {
		return this._isActive;
	}

	/**
	 * Gets the isActive status.
	 * @public
	 * @param _isActive
	 * @return {void}
	 */
	public set isActive(_isActive: boolean) {
		this._isActive = _isActive;
	}

	/**
	 * Gets the isActive status.
	 * @public
	 * @return {boolean}
	 */
	public get isVisible() {
		return this._isVisible;
	}

	/**
	 * Gets the isVisible status.
	 * @public
	 * @param _isVisible
	 * @return {void}
	 */
	public set isVisible(_isVisible: boolean) {
		this._isVisible = _isVisible;
	}
	///#endregion
}
