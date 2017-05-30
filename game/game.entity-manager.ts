/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./../system/system.state.ts" />
/// <reference path="./character/game.player.ts" />
/// <reference path="../graphics/graphics.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {

	export class EntityManager {
		protected player: Symphony.Game.Player;
		private entities:Game.EntityType;

		public constructor(player: any) {
			this.player = new Game.Player(player);
			this.entities = {
				bosses:[],
				enemies:[],
				projectiles:[],
				items:[]
			}
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
				throw new Error(`In Game.EntityManger.add(). The object key: ${key} does not exists`)

			this.entities[key].push(value);
		}

		public get<T>(key:string):T[] {
			if (!_.has(this.entities, key))
				throw new Error(`In Game.EntityManger.add(). The object key: ${key} does not exists`)

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



}