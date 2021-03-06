/**
 * @file Symbols for InversifyJs' Inversion of Control container.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

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
	Vector2d: Symbol('Vector2d'),
	Vector2dMath: Symbol('Vector2dMath'),
	Shape: Symbol('Shape'),
	DrawCircle: Symbol('DrawableCircle'),
	Circle: Symbol('Circle'),

	//Game
	Game: Symbol('Game'),
	LoadSessionState: Symbol('LoadSessionState'),
	LoadAudioState: Symbol('LoadAudioState'),
	IntroState: Symbol('IntroState'),
	StageState: Symbol('StageState'),
	EntityManager: Symbol('EntityManager'),
	Player: Symbol('Player'),
	PlayerState: Symbol('PlayerState'),
	PianoKey: Symbol('PianoKey'),
	Piano: Symbol('Piano'),
	NewablePianoKey: Symbol('NewablePianoKey'),
	NewableColor: Symbol('NewableColor'),
	NewableCssColor: Symbol('NewableCssColor'),
	NewableVector2d: Symbol('NewableVector2d'),
	Projectiles: Symbol('Projectiles'),
	Items: Symbol('Items'),
	Enemies: Symbol('Enemies'),
	Bosses: Symbol('Bosses'),
	PianoKeys: Symbol('PianoKeys'),

	//Audio
	Audio: Symbol('Audio'),

	//3rd Party.
	MidiJs: Symbol('MidiJs'),
	Lodash: Symbol('Lodash'),
	Widgets: Symbol('Widgets'),
	jQuery: Symbol('jQuery'),
	Keydown: Symbol('Keydown')
};

export { TYPES };
