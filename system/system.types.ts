/**
 * @file System types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

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
	readonly state: IState;
}

/**
 * @interface
 */
export interface IFsm {
	update(dt: number): void;
	draw(resource: ICanvasResource): void;
	push(state: IState): void;
	pop(stopCurrentState: boolean): void;
}

/**
 * @interface
 */
export interface IStack<T> {
	readonly length: number;
	isEmpty(): boolean;
	peek(): T;
	push(value: T): void;
	pop(): T;
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
	readonly ctx: CanvasRenderingContext2D;
	readonly bgCtx: CanvasRenderingContext2D;
	readonly canvas: HTMLCanvasElement;
	readonly bgCanvas: HTMLCanvasElement;
}
