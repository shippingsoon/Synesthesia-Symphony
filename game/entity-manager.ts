/**
 * @file The (badly named) EntityManager class invokes the update() and draw() routines for various entities.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @see {@link https://blog.codinghorror.com/i-shall-call-it-somethingmanager/}
 */

import {Player} from './character/player';
import {IBoss, IEnemy, IGameData, IItem, IPlayer, IProjectile, ISession} from './types';
import {LoDashStatic} from 'lodash';
import {ICanvasResource, IState} from '../system/types';
import {inject, injectable, unmanaged} from 'inversify';
import {TYPES} from '../bootstrap/inversify.types';
import {CssColor} from '../graphics/css-color';
import {Vector2dMath} from '../graphics/vector-2d-math';
import {PlayerState} from './character/player-state';

declare const Keydown: any;

/**
 * @classdesc The (badly named) EntityManager class invokes the update() and draw() routines for various entities. DevNote: Manager is a bad name.
 */
@injectable()
export class EntityManager {
	public constructor(
		@inject(TYPES.Session) private session: ISession,
		@inject(TYPES.Projectiles) private projectiles: Set<IProjectile>,
		@inject(TYPES.Items) private items: Set<IItem>,
		@inject(TYPES.Enemies) private enemies: Set<IEnemy>,
		@inject(TYPES.Bosses) private bosses: Set<IBoss>,
		@inject(TYPES.PlayerState) private playerState: IState
	) {
	}

	public update(dt: number, resource: ICanvasResource): void {
		//Handle logic for the player.
		this.playerState.update(dt, resource);
	}

	public draw(resource: ICanvasResource): void {
		//Draw the player.
		this.playerState.draw(resource);
	}

	private _invokeAll<T>(collections: T[], command: Function, condition: Function = null): void {
		collections.forEach((entity) => {
			if (entity && (condition === null || condition(entity))) {
				command(entity);
			}
		});
	}
}
