/**
 * @file The application's entry point.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { container } from './bootstrap/inversify.config';
import { TYPES } from './bootstrap/inversify.types';
import { IGame } from './game/game.types';

namespace SynesthesiaSymphony {
	//Here we use InversifyJS' Inversion of Control container to resolve dependencies.
	const game: IGame = container.get<IGame>(TYPES.Game);

	//Start the game loop.
	const requestAnimationID: number = requestAnimationFrame((timestamp: number) => game.main(timestamp));
}
