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
import { Loader } from './system/system.mixin-traits';
import { Mixin } from './system/system.mixin';

@Mixin(Loader)
class Shape implements Loader {
	public x: number;
	public y: number;
	load: <T> () => Promise<T>;
	constructor(public $) {}
}
declare const jQuery: any;

namespace SynesthesiaSymphony {
	//const test = new Shape(jQuery);
	//debugger;

	//Here we use InversifyJS' Inversion of Control container to resolve dependencies.
	const game: IGame = container.get<IGame>(TYPES.Game);

	//Start the game loop.
	game.main();
}
