/**
 * @file Abstract game states class. Game states are used by the finite state machine. See the FSM class in system.fsm.ts for more details.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IState, ICanvasResource, IWindow, ICustomEventData, FsmEvents } from './system.types';
import { injectable } from 'inversify';
import { Mixin } from './system.mixin';
import { Emitable } from './system.mixin-traits';

/**
 * @class
 * @classdesc Abstract State class.
 * @abstract
 */
@Mixin([Emitable])
@injectable()
export abstract class State implements IState, Emitable {
	//Mixin.
	public emit: (eventName: FsmEvents, detail: ICustomEventData, _window: IWindow) => void;

	/**
	 * DevNote: If the constructor is protected it cannot be instantiated outside of the class body, but it can be extended.
	 * @constructor
	 */
	protected constructor() {}

	//#region Polymorphism Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Handles logic for the state.
	 * @abstract
	 * @param {IStateData} dt - The delta time between the current and previous frame.
	 * @return {void}
	 */
	public abstract update(dt: number): void;

	/**
	 * Renders the state.
	 * @abstract
	 * @param {ICanvasResource} resource - An object containing the 2D drawing context and delta time.
	 * @return {void}
	 */
	public abstract draw(resource: ICanvasResource): void;

	/**
	 * This method contains logic that is invoked when the state is pushed on the Fsm stack. It can be thought of as a constructor.
	 * @abstract
	 * @return {void}
	 */
	public abstract start(): void;

	/**
	 * This method contains logic that is invoked when the state is popped from the Fsm stack. It can be thought of as a destructor.
	 * @abstract
	 * @return {void}
	 */
	public abstract stop(): void;

	/**
	 * Resumes the state.
	 * @abstract
	 * @return {void}
	 */
	public abstract play(): void;

	/**
	 * Suspends the state but does not remove from the Fsm stack.
	 * @abstract
	 * @return {void}
	 */
	public abstract pause(): void;
	///#endregion
}
