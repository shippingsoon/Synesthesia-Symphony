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
			let player:Game.Player = new Game.Player({x: 100, y: 100, r: 100});
			this.entityManger = new StageManager(player);
		}

		public update(o:any):void {
			this.entityManger.update();
		}

		public draw(o:any):void {
			this.entityManger.draw();
		}
	}

	export class StageManager {
		private player:any;
		private boss:any;
		private enemies:any[];
		private items:any[];
		private bullets:any[];
		private bulletIndex:number;


		public update():void {
			//Handle logic for the player and boss.
			_.forEach(['player', 'boss'], function(key) {
				if (!_.isEmpty(this[key]) && this[key].isActive())
					this[key].update();
			});

			//Handle logic for the bullets.
			for (let bullet:number = this.bulletIndex; bullet < this.bullets.length; bullet++) {
				if (!_.isEmpty(this.bullets[bullet]) && this.bullets[bullet].isActive()) {
					this.bullets[bullet].update();
				}
			}

			//Handle logic for the enemies and items.
			_.forEach(['enemies', 'items'], function(key) {
				_.forEach(this[key], function(value) {
					if (!_.isEmpty(value) && value.isActive())
						value.update();
				});
			});
		}

		public draw():void {
			//Drwa the player and boss entities.
			_.forEach(['player', 'boss'], function(key) {
				if (!_.isEmpty(this[key]) && this[key].isVisible())
					this[key].draw();
			});

			//Draw the bullets.
			for (let bullet:number = this.bulletIndex; bullet < this.bullets.length; bullet++) {
				if (!_.isEmpty(this.bullets[bullet]) && this.bullets[bullet].isVisible()) {
					this.bullets[bullet].draw();
				}
			}

			//Draw the enemies and items.
			_.forEach(['enemies', 'items'], function(key) {
				_.forEach(this[key], function(value) {
					if (!_.isEmpty(value) && value.isVisible())
						value.draw();
				});
			});
		}

		public add(key:string, value:any):void {
			this[key].push(value);
		}

		public constructor(player:any) {
			this.player = new Game.Player({});
		}
	}
}