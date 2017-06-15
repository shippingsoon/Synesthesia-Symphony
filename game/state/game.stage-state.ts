/**
 * @file The stage game state.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { StateData } from '../../system/system';
import { State } from '../../system/system.state';
import { EntityManager } from '../game.entity-manager';

/**
 * @class
 * @classdesc The stage game state.
 */
export class StageState extends State {
	private entityManger: EntityManager;

	public start(data: StateData): void {
		this.entityManger = new EntityManager(data.session.getGameData);
	}

	public update(data: StateData): void {
		this.entityManger.update(data);
	}

	public draw(data: StateData): void {
		this.entityManger.draw(data);
	}

	public pause(data: StateData): void {

	}

	public play(data: StateData): void {

	}

	public stop(data: StateData): void {

	}
}
