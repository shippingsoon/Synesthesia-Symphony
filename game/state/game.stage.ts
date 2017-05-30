/*
 * @description -
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./../../system/system.ts" />
/// <reference path="./../../system/system.state.ts" />
/// <reference path="../game.entity-manager.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	export class Stage extends System.State {
		private entityManger:Game.EntityManager;

		public start(data:System.StateData):void {
			this.entityManger = new Game.EntityManager({x: 0, y: 100, r: 20, speed:500, fillColor: {r:70, g:240, b:82, a:1}});
		}

		public update(data:System.StateData):void {
			this.entityManger.update(data);
		}

		public draw(data:System.StateData):void {
			this.entityManger.draw(data);
		}

		public pause(data:System.StateData):void {

		}

		public play(data:System.StateData):void {

		}

		public stop(data:System.StateData):void {

		}
	}
}