/**
 * @file The intro state. This is the first game state that is 2nd game state that is loaded into the finite state machine. It plays the intro scene.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource, IState } from '../../system/types';
import { State } from '../../system/state';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../bootstrap/inversify.types';

/**
 * @class
 * @classdesc The intro state.
 */
@injectable()
export class IntroState extends State {
	public constructor(@inject(TYPES.StageState) private nextState: IState) {
		super();
	}

	public start(): void {
		console.log('IntroState');
		this.emit('pushState', {state: this.nextState});
		//debugger;
		/*
		bg_canvas.addEventListener("webkitTransitionEnd", function(event) {
			o.fsm.push({state: new Game.State.Menu});
		}, false);

		bg_canvas.style.backgroundColor = "white";
		*/
	}

	public update(dt: number): void {}
	public draw(resource: ICanvasResource): void {}
	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
