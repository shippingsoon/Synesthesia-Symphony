/**
 * @file The (badly named) EntityManager class invokes the update() and draw() routines for various entities.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 * @see {@link https://blog.codinghorror.com/i-shall-call-it-somethingmanager/}
 */

import {Player} from './character/player';
import {Enemy} from './character/enemy';
import {clearCanvas} from '../graphics/graphics';
import {EntityType, IGameData} from './types';
import {LoDashStatic} from 'lodash';
import {ICanvasResource} from '../system/types';
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
	protected readonly playerState: PlayerState;
	private entities: EntityType;

	/**
	 * @param data - The remotely loaded game data.
	 * @param _ - Lodash library.
	 */
	public constructor(@unmanaged() data: IGameData, @inject(TYPES.Lodash) private _: LoDashStatic) {
		this.entities = {
			bosses: [],
			enemies: [],
			projectiles: [],
			items: []
		};

		//Create the player.
		this.playerState = new PlayerState(
			new Player(
				new CssColor(data.player.fillColor),
				new Vector2dMath(data.player.position),
				data.player.r,
				data.player.speed
			)
		);
	}

	public update(dt: number, resource: ICanvasResource): void {
		//Handle logic for the player.
		this.playerState.update(dt, resource);
	}

	public draw(resource: ICanvasResource): void {
		//Draw the player.
		this.playerState.draw(resource);
	}

	/**
	 * This method is a good example of Functional programming.
	 * @param {Object} collections -
	 * @param {Function} command - The command to run.
	 * @param {Function} [condition=null] - The condition to check.
	 * @return {void}
	 */
	private _invokeAll<T>(collections: T[], command: Function, condition: Function = null): void {
		collections.forEach((entity) => {
			if (!this._.isEmpty(entity) && (condition === null || condition(entity))) {
				command(entity);
			}
		});
	}
}