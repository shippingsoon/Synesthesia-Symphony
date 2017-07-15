/**
 * @file The application's entry point.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { Game } from './game/game';
import { FSM } from './system/system.fsm'
import { LoadState } from './game/state/game.load-state';
import { StateStack } from './system/system.state-stack';



/**
 * The application's entry point.
 * @namespace
 */
namespace SynesthesiaSymphony {
	'use strict';

	//const game = Game.getInstance(new FSM(new StateStack()), new LoadState());
	//game.main();
}
