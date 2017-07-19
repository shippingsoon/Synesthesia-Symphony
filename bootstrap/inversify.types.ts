/**
 * @file Symbols for InversifyJS' Inversion of Control container.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import * as _ from 'lodash';

const TYPES = {
	//System
	Stack: Symbol('Stack'),
	Array: Symbol('Array'),
	State: Symbol('State'),
	Session: Symbol('Session'),
	Fsm: Symbol('Fsm'),
	CanvasResource: Symbol('CanvasResource'),
	Window: Symbol('Window'),

	//Graphics
	Color: Symbol('Color'),
	CssColor: Symbol('CssColor'),
	Vector: Symbol('Vector'),
	Shape: Symbol('Shape'),
	CircleShape: Symbol('CircleShape'),
	Circle: Symbol('Circle'),
	SquareShape: Symbol('SquareShape'),
	Square: Symbol('Square'),

	//Game
	Game: Symbol('Game'),
	LoadState: Symbol('LoadState'),

	//3rd Party.
	Lodash: Symbol('Lodash'),
	MIDI: Symbol('MIDI'),
	jQuery: Symbol('jQuery')
};

type Lodash = typeof _;

export { TYPES, Lodash };
