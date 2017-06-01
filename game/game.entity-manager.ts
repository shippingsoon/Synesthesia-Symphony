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

/**
 * @namespace
 */
namespace Symphony.Game {
	"use strict";

	/**
	 * @class
	 * @classdesc Invokes the update() and draw() routines for various entities.
	 */
	export class EntityManager {
		protected player:Game.Player;
		private entities:Game.EntityType;
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
				projectiles:new Array(this.maxProjectiles),
				items:[]
			};

			//Create the player.
			this.player = new Game.Player(data.player);

			//Create the enemies.
			data.enemies.forEach((enemyData) => {
				this.entities.enemies.push(new Game.Enemy(enemyData));
			});
		}

		public update(data:System.StateData):void {
			data.manager = this;

			//Handle logic for the bullets, items, enemies, and bosses.
			_.each(this.entities, (entity) => {
				this._invokeAll(entity, (o) => o.update(data), (o) => o.isActive);
			});

			//Handle logic for the player.
			if (!_.isEmpty(this.player) /*&& this.player.isActive*/)
				this.player.update(data);
		}

		public draw(data:System.StateData):void {
			Graphics.clearCanvas(data.session.ctx, data.session.canvas);

			//Render the bullets, items, enemies, and bosses.
			_.each(this.entities, (entity) => {
				this._invokeAll(entity, (o) => o.draw(data), (o) => o.isVisible);
			});

			//Draw the player.
			if (!_.isEmpty(this.player) /*&& this.player.isVisible*/)
				this.player.draw(data);

		}

		public add<T>(key:string, value:T):void {
			//console.log(this.entities);
			if (!_.has(this.entities, key))
				throw new Error(`In Game.EntityManger.add(). The object key: ${key} does not exists`);

			this.entities[key].push(value);
		}

		public get<T>(key:string):T[] {
			if (!_.has(this.entities, key))
				throw new Error(`In Game.EntityManger.add(). The object key: ${key} does not exists`);

			return this.entities[key];
		}

		public get getPlayer():Game.Player {
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
		bosses:object[];
		enemies:object[],
		projectiles:object[],
		items:object[]
	}

	const enum ENTITY {
		BOSS = 0,
		ENEMYDOWN,
		PROJECTILE,
		ITEM
	}


}