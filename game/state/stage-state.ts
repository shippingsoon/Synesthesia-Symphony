/**
 * @file The stage game state.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {State} from '../../system/state';
import {EntityManager} from '../entity-manager';
import {inject, injectable} from 'inversify';
import {ICanvasResource} from '../../system/types';
import {ISession} from '../types';
import {TYPES} from '../../bootstrap/inversify.types';
import _ from 'lodash';
import {Piano} from '../piano';
import {clearCanvas} from '../../graphics/graphics';

/**
 * @class
 * @classdesc The stage game state.
 */
@injectable()
export class StageState implements State {
	private entityManger: EntityManager;

	public constructor(
		@inject(TYPES.Session) private session: ISession,
		@inject(TYPES.Piano) private piano: Piano,
		@inject(TYPES.EntityManager) private entityManager: EntityManager
	) {
	}

	public start(): void {
		console.log('StageState');
	}

	public update(dt: number, resource: ICanvasResource): void {
		this.entityManager.update(dt, resource);
	}

	public draw(resource: ICanvasResource): void {
		clearCanvas(resource.ctx, resource.canvas);
		this.piano.draw(resource);
		this.entityManager.draw(resource);
	}

	public pause(): void {}
	public play(): void {}
	public stop(): void {}
}
