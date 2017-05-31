/**
 * @file The stage game state.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/// <reference path="./../../system/system.ts" />
/// <reference path="./../../system/system.state.ts" />
/// <reference path="../game.entity-manager.ts" />

/**
 * @namespace
 */
namespace Symphony.Game {
	"use strict";

	/**
	 * @class
	 * @classdesc The stage game state.
	 */
	export class StageState extends System.State {
		private entityManger:Game.EntityManager;

		public start(data:System.StateData):void {

			this.entityManger = new Game.EntityManager(data.session.getGameData);
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