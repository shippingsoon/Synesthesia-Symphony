/**
 * @file PlayerState class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { ICanvasResource } from '../../system/types';
import { unmanaged } from 'inversify';
import { State } from '../../system/state';

/**
 * @classdesc The player state class.
 */
export class PlayerState extends State {
	/**
	 * @param player -
	 */
	public constructor(@unmanaged() private player) {
		super();
	}

	public start() {}

	public update(dt: number): void {
		//Handle keyboard input.
		this.player.handleInput(dt);
	}

	public draw(resource: ICanvasResource): void {
		this.player.render(
			resource.ctx,
			this.player.position,
			this.player.r,
			this.player.fillColor,
			'black',
			1
		);
	}

	public pause(): void {}
	public stop(): void {}
	public play(): void {}
}
