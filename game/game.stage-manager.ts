/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./../system/system.state.ts" />
/// <reference path="./character/game.player.ts" />

namespace Symphony.Game {
	export class StageManager {
		private player: Game.Player;
		private bosses: any[] = [];
		private enemies: any[] = [];
		private items: any[] = [];
		private bullets: any[] = [];
		private bulletIndex: number;

		private readonly _collections: string[] = ['bosses', 'enemies', 'bullets', 'items'];

		public constructor(player: any) {
			this.player = new Game.Player(player);
		}

		public update(data:System.StateData):void {
			//Handle logic for the player.
			if (!_.isEmpty(this.player) /*&& this.player.isActive*/)
				this.player.update(data);

			//Handle logic for the bullets, items, enemies, and bosses.
			this._collections.forEach((collection) => {
				this._invoke(this[collection], (o) => o.update(data), (o) => o.isActive);
			});
		}

		public draw(data:System.StateData):void {
			//Draw the player.
			if (!_.isEmpty(this.player) && this.player.isVisible)
				this.player.draw(data);
			debugger;
			//Render the bullets, items, enemies, and bosses.
			this._collections.forEach((collection) => {
				this._invoke(this[collection], (o) => o.draw(data), (o) => o.isVisible);
			});
		}

		public add<T>(key: string, value: T):void {
			if (_.includes(this._collections, key))
				this[key].push(value);
		}

		/**
		 * This method is a good example of Functional programming.
		 * @param {Object} collections -
		 * @param {Function} command - The command to run.
		 * @param {Function} condition - The condition to check.
		 * @return {void}
		 */
		private _invoke<T>(collections: T[], command: Function, condition: Function = null):void {
			collections.forEach((collection) => {
				if (!_.isEmpty(collection) && (condition === null || condition(collection))) {
					command(collection);
				}
			});
		}
	}

}