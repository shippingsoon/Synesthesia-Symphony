/**
 * @file The stage game state.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { State } from '../../system/system.state';
import { EntityManager } from '../game.entity-manager';

/**
 * @class
 * @classdesc The stage game state.
 */
export class StageState  {
	private entityManger: EntityManager;

	public constructor() {
		//super();
	}

	public start(data: any): void {
		this.entityManger = new EntityManager(data.session.getGameData);
	}

	public update(data: any): void {
		this.entityManger.update(data);
	}

	public draw(data: any): void {
		this.entityManger.draw(data);
	}

	public pause(data: any): void {

	}

	public play(data: any): void {

	}

	public stop(data: any): void {

	}
}
