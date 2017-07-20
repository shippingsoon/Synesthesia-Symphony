/**
 * @file The intro state. This is the first game state that is 2nd game state that is loaded into the finite state machine. It plays the intro scene.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource } from '../../system/system.types';
import { State } from '../../system/system.state';
import { injectable } from 'inversify';

/**
 * @class
 * @classdesc The intro state.
 */
@injectable()
export class IntroState extends State {
	public constructor() {
		super();
	}

	public start(): void {
		//Audio.playSong(data.session.getGameData.songs[3], MIDI, data.session.config);
		console.log('intro state');

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
