/**
 * @file Types for Inversify's IoC container.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

const TYPES = {
	//System
	StateStack: Symbol('StateStack'),
	Array: Symbol('Array'),
	State: Symbol('State'),
	Session: Symbol('Session'),
	Fsm: Symbol('Fsm'),
	CanvasResource: Symbol('CanvasResource'),

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
	MIDI: Symbol('MIDI')
};

export { TYPES };
