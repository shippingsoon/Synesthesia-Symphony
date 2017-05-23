/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./../../system/system.ts" />
/// <reference path="./../../system/system.state.ts" />

namespace Symphony.Game.State {
	export class Stage implements System.State {
		private entityManger:StageManager;

		public start(o:any):void {
			this.entityManger = new StageManager({x: 0, y: 100, r: 20, speed:768});
		}

		public update(o:any):void {
			this.entityManger.update(o);
		}

		public draw(o:any):void {
			this.entityManger.draw(o);
		}
	}

	export class StageManager {
		private player:any;
		private bosses:any[];
		private enemies:any[];
		private items:any[];
		private bullets:any[];
		private bulletIndex:number;


		public update(o:any):void {
			let keys:string[] = ['bosses', 'enemies', 'items', 'bullets'];

			//debugger;

			//Handle logic for the player.
			if (!_.isEmpty(this.player))
				this.player.update(o);

			for (let key of keys) {
				if (!_.isEmpty(this[key])) {
					for (var i = 0; i < this[key].length; i++) {
						if (!_.isEmpty(this[key][i]))
							this[key][i].update(o);
					}
				}
			}
		}

		public draw(o:any):void {
			let keys:string[] = ['bosses', 'enemies', 'items', 'bullets'];

			//debugger;

			//Draw
			if (!_.isEmpty(this.player))
				this.player.draw(o);

			for (let key of keys) {
				if (!_.isEmpty(this[key])) {
					for (var i = 0; i < this[key].length; i++) {
						if (!_.isEmpty(this[key][i]))
							this[key][i].draw(o);
					}
				}
			}
		}

		public add(key:string, value:any):void {
			this[key].push(value);
		}

		public constructor(player:any) {
			this.player = new Game.Player(player);
		}
	}
}