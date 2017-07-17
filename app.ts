/**
 * @file The application's entry point.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { Game } from './game/game';
import { container } from './bootstrap/inversify.config';
import { TYPES } from './bootstrap/bootstrap.types';

namespace SynesthesiaSymphony {
	'use strict';

	const game: Game = container.get<Game>(TYPES.Game);
	game.main();
}
