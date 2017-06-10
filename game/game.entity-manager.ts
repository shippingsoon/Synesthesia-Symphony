/**
 * @file Invokes the update() and draw() routines for various entities.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./../system/system.state.ts" />
/// <reference path="./character/game.player.ts" />
/// <reference path="./character/game.enemy.ts" />
/// <reference path="../graphics/graphics.ts" />


'use strict';
import { Player } from './character/game.player';
import { Enemy } from './character/game.enemy';
import { StateData } from './../system/system';
import { clearCanvas } from './../graphics/graphics';
//import * as _ from 'lodash';
declare let _:any;
/**
 * @class
 * @classdesc Invokes the update() and draw() routines for various entities.
 */
export class EntityManager {
	protected player:Player;
	private entities:EntityType;
	private readonly maxProjectiles:number;

	/**
	 * @param {any} data - The game data.
	 * @param {number} maxProjectiles
	 */
	public constructor(data:any, maxProjectiles:number = 300) {
		this.maxProjectiles = maxProjectiles;

		this.entities = {
			bosses:[],
			enemies:new Array(((_.isEmpty(data.enemies)) ? 0 : data.enemies.length)),
			projectiles:[],
			items:[]
		};

		//Create the player.
		this.player = new Player(data.player);

		//Create the enemies.
		data.enemies.forEach((enemyData) => {
			this.entities.enemies.push(new Enemy(enemyData));
		});
	}

	public update(data:StateData):void {
		data.manager = this;

		//Handle logic for the bullets, items, enemies, and bosses.
		_.each(this.entities, (entity) => {
			this._invokeAll(entity, (o) => o.update(data), (o) => o.isActive);
		});

		//Handle logic for the player.
		if (!_.isEmpty(this.player) /*&& this.player.isActive*/)
			this.player.update(data);
	}

	public draw(data:StateData):void {
		clearCanvas(data.session.ctx, data.session.canvas);

		//Render the bullets, items, enemies, and bosses.
		_.each(this.entities, (entity) => {
			this._invokeAll(entity, (o) => o.draw(data), (o) => o.isVisible);
		});

		//Draw the player.
		if (!_.isEmpty(this.player) /*&& this.player.isVisible*/)
			this.player.draw(data);
	}

	public add<T>(key:EntityKeys, value:T):void {
		this.entities[key].push(value);
	}

	public get<T>(key:EntityKeys):T[] {
		return this.entities[key];
	}

	public get getPlayer():Player {
		return this.player;
	}

	/**
	 * This method is a good example of Functional programming.
	 * @param {Object} collections -
	 * @param {Function} command - The command to run.
	 * @param {Function} [condition=null] - The condition to check.
	 * @return {void}
	 */
	private _invokeAll<T>(collections:T[], command:Function, condition:Function = null):void {
		collections.forEach((entity) => {

			if (!_.isEmpty(entity) && (condition === null || condition(entity))) {
				command(entity);
			}
		});
	}
}

/**
 * @interface
 */
export interface EntityType {
	bosses:any[];
	enemies:any[],
	projectiles:any[],
	items:any[]
}

type EntityKeys = "bosses" | "enemies" | "projectiles" | "items";


