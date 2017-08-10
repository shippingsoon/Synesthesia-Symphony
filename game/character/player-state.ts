/**
 * @file PlayerState class.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {ICanvasResource} from '../../system/types';
import {inject, injectable, unmanaged} from 'inversify';
import {State} from '../../system/state';
import {DrawableCircle} from '../../graphics/mixin/drawable-circle';
import {Mixin} from '../../system/mixin';
import {Player} from './player';
import {TYPES} from '../../bootstrap/inversify.types';
import {IPlayer, ISession} from '../types';

/**
 * @classdesc The player state class.
 */
@Mixin(DrawableCircle)
@injectable()
export class PlayerState extends State implements DrawableCircle {
	/**
	 * Mixins
	 * See the class for a proper JsDoc description.
	 */
	public render: (...args: any[]) => void;

	/**
	 * @param player -
	 * @param session -
	 */
	public constructor(@inject(TYPES.Player) private player: IPlayer, @inject(TYPES.Session) session: ISession) {
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
