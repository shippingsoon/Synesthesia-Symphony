/**
 * @file Abstract game states class. Game states are used by the finite state machine design pattern. See the FSM class in system.fsm.ts for more details.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IStateData, IState, ICanvasResource } from './system.types';
import { injectable } from 'inversify';
import 'reflect-metadata';

/**
 * @class
 * @classdesc state abstract class.
 * @abstract
 */
@injectable()
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
	 * If the constructor is protected it cannot be instantiated outside of the class body, but it can be extended.
	 * @protected
	 * @constructor
	 */
	protected constructor() {}

	//#region Polymorphism Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Handles logic for the state.
	 * @public
	 * @abstract
	 * @param {IStateData} dt - The delta time between the current and previous frame.
	 * @return {void}
	 */
	public abstract update(dt: number): void;

	/**
	 * Renders the state.
	 * @public
	 * @abstract
	 * @param {ICanvasResource} resource - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract draw(resource: ICanvasResource): void;

	/**
	 * This method contains logic that is invoked when the state is pushed on the Fsm stack. It can be thought of as a constructor.
	 * @public
	 * @abstract
	 * @return {void}
	 */
	public abstract start(): void;

	/**
	 * This method contains logic that is invoked when the state is popped from the Fsm stack. It can be thought of as a destructor.
	 * @public
	 * @abstract
	 * @return {void}
	 */
	public abstract stop(): void;

	/**
	 * Resumes the state.
	 * @public
	 * @abstract
	 * @return {void}
	 */
	public abstract play(): void;

	/**
	 * Suspends the state but does not remove from the Fsm stack.
	 * @public
	 * @abstract
	 * @return {void}
	 */
	public abstract pause(): void;

	///#endregion

	//#region Mutator Region (Note: regions are collapsible with IntelliJ)
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
	 * @param isActive
	 * @return {void}
	 */
	public set isActive(isActive: boolean) {
		this._isActive = isActive;
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
	 * @param isVisible
	 * @return {void}
	 */
	public set isVisible(isVisible: boolean) {
		this._isVisible = isVisible;
	}
	///#endregion
}
