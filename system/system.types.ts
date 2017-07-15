/**
 * @file System types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { IResource } from '../game/game.types';
/**
 * The data structure we will pass to the finite state machine.
 * @interface
 */
export interface IStateData {
	//A game state.
	readonly state?: IState;

	//Game session.
	readonly session?: any;

	//Delta time. The time difference from the current and previous game state.
	readonly dt?: number;

	//Determines if we will pause the state.
	readonly pause?: boolean;

	//Entity manager
	//readonly manager?: any;
}

/**
 * @interface
 */
export interface IState {
	start(data: {state: IState}): void;
	stop?(data: IStateData): void;
	update(dt: number): void;
	draw(resource: IResource): void;
	play?(data: IStateData): void;
	pause?(data: IStateData): void;
}

/**
 * @type FSMEvents
 */
export type FSMEvents = 'pushState' | 'popState';

/**
 * @interface
 */
export interface IFSM {
	update(dt: number): void;
	draw(resource: IResource): void;
	push(state: IState): void;
	pop(data: IStateData): void;
}

/**
 * @interface
 */
export interface IStateStack {
	length: number;
	isEmpty(): boolean;
	peek(): IState;
	push(state: IState): void;
	pop(): IState;
}

/*
start(config, session)
draw(resource)
	update(dt)
*/
