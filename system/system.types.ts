/**
 * @file System types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

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
}

/**
 * @interface
 */
export interface IState {
	start(): void;
	update(dt: number): void;
	draw(resource: ICanvasResource): void;
	stop(): void;
	play(): void;
	pause(): void;
}

/**
 * @type FsmEvents
 */
export type FsmEvents = 'pushState' | 'popState';

/**
 * @interface
 */
export interface ICustomEventData {
	readonly state?: IState;
	readonly resource?: ICanvasResource;
}

/**
 * @interface
 */
export interface IFsm {
	update(dt: number): void;
	draw(resource: ICanvasResource): void;
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

/**
 * @interface
 */
export interface IWindow {
	addEventListener(type: string, listener: EventListener, useCapture?: boolean);
	removeEventListener(type: string, listener: EventListener, useCapture?: boolean);
	dispatchEvent(evt: Event): boolean;
}

/**
 * @interface
 */
export interface ICanvasResource {
	ctx: CanvasRenderingContext2D;
	bgCtx: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	bgCanvas: HTMLCanvasElement;
}
