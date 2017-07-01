/**
 * @file Invokes the update() and draw() routines for various entities.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

'use strict';

import { Player } from './character/game.player';
import { Enemy } from './character/game.enemy';
import { IStateData } from '../system/system.types';
import { clearCanvas } from '../graphics/graphics';
import { IEntity, EntityType, EntityKeys } from 'game.types';
import _  from 'lodash';

/**
 * @class
 * @classdesc Invokes the update() and draw() routines for various entities.
 */
export class EntityManager {
	protected readonly player: Player;
	private entities: EntityType;

	/**
	 * @param {any} data - The game data.
	 */
	public constructor(data: any) {
		this.entities = {
			bosses: [],
			enemies: [],
			projectiles: [],
			items: []
		};

		//Create the player.
		this.player = new Player(data.player);

		//Create the enemies.
		data.enemies.forEach((enemyData) => {
			this.entities.enemies.push(new Enemy(enemyData));
		});
	}

	public update(data: IStateData): void {
		//data.manager = this;

		//Handle logic for the bullets, items, enemies, and bosses.
		_.each(this.entities, (entity) => {
			this._invokeAll(entity, (o) => o.update(data), (o) => o.isActive);
		});

		//Handle logic for the player.
		if (!_.isEmpty(this.player) /*&& this.player.isActive*/) {
			this.player.update(data);
		}
	}

	public draw(data: IStateData): void {
		clearCanvas(data.session.ctx, data.session.canvas);

		//Render the bullets, items, enemies, and bosses.
		_.each(this.entities, (entity) => {
			this._invokeAll(entity, (o) => o.draw(data), (o) => o.isVisible);
		});

		//Draw the player.
		if (!_.isEmpty(this.player) /*&& this.player.isVisible*/) {
			this.player.draw(data);
		}
	}

	public add(key: EntityKeys, value: IEntity): void {
		this.entities[key].push(value);
	}

	public get(key: EntityKeys): IEntity[] {
		return this.entities[key];
	}

	public get getPlayer(): IEntity {
		return this.player;
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

			if (!_.isEmpty(entity) && (condition === null || condition(entity))) {
				command(entity);
			}
		});
	}
}
