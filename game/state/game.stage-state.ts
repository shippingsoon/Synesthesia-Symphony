/**
 * @file The stage game state.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { IStateData } from '../../system/system.types';
import { State } from '../../system/system.state';
import { EntityManager } from '../game.entity-manager';

/**
 * @class
 * @classdesc The stage game state.
 */
export class StageState extends State {
	private entityManger: EntityManager;

	public constructor() {
		super();
	}

	public start(data: IStateData): void {
		this.entityManger = new EntityManager(data.session.getGameData);
	}

	public update(data: IStateData): void {
		this.entityManger.update(data);
	}

	public draw(data: IStateData): void {
		this.entityManger.draw(data);
	}

	public pause(data: IStateData): void {

	}

	public play(data: IStateData): void {

	}

	public stop(data: IStateData): void {

	}
}
