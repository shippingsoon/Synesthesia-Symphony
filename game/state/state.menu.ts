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
	export class Menu implements System.State {
		public start(o:any):void {
			o.fsm.push({state: new Game.State.Stage});
		}

		public update(o:any):void {

		}

		public draw(o:any):void {

		}
	}
}