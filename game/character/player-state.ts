/**
 * @file PlayerState class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ICanvasResource} from '../../system/types';
import {unmanaged} from 'inversify';
import {State} from '../../system/state';
import {DrawableCircle} from '../../graphics/mixin/drawable-circle';
import {Mixin} from '../../system/mixin';
import {Player} from './player';

/**
 * @classdesc The player state class.
 */
@Mixin(DrawableCircle)
export class PlayerState extends State implements DrawableCircle {
	/**
	 * Mixins
	 * See the class for a proper JsDoc description.
	 */
	public render: (...args: any[]) => void;

	/**
	 * @param player -
	 */
	public constructor(@unmanaged() private player: Player) {
		super();
	}

	public start() {}

	public update(dt: number, resource: ICanvasResource): void {
		//Handle keyboard input.
		this.player.handleInput(dt);
	}

	public draw(resource: ICanvasResource): void {
		this.render(
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
