/**
 * @file The stage game state.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { State } from '../../system/system.state';
import { EntityManager } from '../game.entity-manager';
import { inject, injectable } from 'inversify';
import { ICanvasResource } from '../../system/system.types';
import { ISession } from '../game.types';
import { TYPES } from '../../bootstrap/inversify.types';

/**
 * @class
 * @classdesc The stage game state.
 */
@injectable()
export class StageState implements State {
	private entityManger: EntityManager;

	public constructor(@inject(TYPES.Session) private session: ISession) {}

	public start(): void {
		this.entityManger = new EntityManager(this.session.data);
	}

	public update(dt: number): void {
		//this.entityManger.update(data);
	}

	public draw(resource: ICanvasResource): void {
		//this.entityManger.draw(data);
	}

	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
