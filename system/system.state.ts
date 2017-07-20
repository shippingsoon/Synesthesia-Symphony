/**
 * @file Abstract game states class. Game states are used by the finite state machine. See the FSM class in system.fsm.ts for more details.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IState, ICanvasResource, IWindow, ICustomEventData, FsmEvents } from './system.types';
import { injectable } from 'inversify';
import { Mixin } from './system.mixin';
import { Emitable } from './system.mixin-traits';

/**
 * @classdesc Abstract State class.
 */
@Mixin(Emitable)
@injectable()
export abstract class State implements IState, Emitable {
	//Mixin. See the class for description.
	public emit?: (eventName: FsmEvents, detail: ICustomEventData, _window?: IWindow) => void;

	/**
	 * DevNote: If the constructor is protected it cannot be instantiated outside of the class body, but it can be extended.
	 */
	protected constructor() {}

	//#region Polymorphism Region (Note: regions are collapsible with IntelliJ)
	/**
	 * Handles logic for the state.
	 * @param dt - The delta time between the current and previous frame.
	 */
	public abstract update(dt: number): void;

	/**
	 * Renders the state.
	 * @param resource - An object containing the 2D drawing context and delta time.
	 */
	public abstract draw(resource: ICanvasResource): void;

	/**
	 * This method contains logic that is invoked when the state is pushed on the Fsm stack. It can be thought of as a constructor.
	 */
	public abstract start(): void;

	/**
	 * This method contains logic that is invoked when the state is popped from the Fsm stack. It can be thought of as a destructor.
	 */
	public abstract stop(): void;

	/**
	 * Resumes the state.
	 */
	public abstract play(): void;

	/**
	 * Suspends the state but does not remove from the Fsm stack.
	 */
	public abstract pause(): void;
	///#endregion
}
