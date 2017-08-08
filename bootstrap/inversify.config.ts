/**
 * @file This file contains configuration for InversifyJs' IoC container.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import {Container, ContainerModule, interfaces} from 'inversify';
import 'reflect-metadata';
import {TYPES} from './inversify.types';
import {Color} from '../graphics/color';
import {CssColor} from '../graphics/css-color';
import {Fsm} from '../system/fsm';
import {Stack} from '../system/stack';
import {Vector2d} from '../graphics/vector-2d';
import {DrawableCircle} from '../graphics/mixin/drawable-circle';
import {Circle} from '../graphics/shape/circle';
import {CanvasResource} from '../game/canvas-resource';
import {Game} from '../game/game';
import {LoadSessionState} from '../game/state/load-session-state';
import {LoadAudioState} from '../game/state/load-audio-state';
import {IntroState} from '../game/state/intro-state';
import {IColor, ICssColor, IVector2d} from '../graphics/types';
import {ICanvasResource, IFsm, IStack, IState} from '../system/types';
import {IGame, IPianoKey, ISession, projectiles} from '../game/types';
import _ from 'lodash';
import {Session} from '../system/session';
import {Vector2dMath} from '../graphics/vector-2d-math';
import {Audio} from '../audio/audio';
import {StageState} from '../game/state/stage-state';
import {EntityManager} from '../game/entity-manager';
import {Player} from '../game/character/player';
import {PianoKey} from '../game/piano-key';
import {IMidiJs} from '../audio/types';
import {Piano} from '../game/piano';
import {Projectile} from '../game/projectile';

//Let the IDE know this 3rd party MidiJs.js module is defined elsewhere.
declare const MIDI: any;
declare const jQuery: any;
declare const widgets: any;
declare const Keydown: any;

//3rd party dependencies go here. DevNote: InversifyJs' toConstant() method uses singleton scope by default.
const thirdPartyDependencies = new ContainerModule((bind) => {
	bind<Array<any>>(TYPES.Array).to(Array);
	bind<typeof _>(TYPES.Lodash).toConstantValue(_);
	bind<IMidiJs>(TYPES.MidiJs).toConstantValue(MIDI);
	bind<typeof widgets>(TYPES.Widgets).toConstantValue(widgets);
	bind<typeof jQuery>(TYPES.jQuery).toConstantValue(jQuery);
	bind<typeof Keydown>(TYPES.Keydown).toConstantValue(Keydown);
});

//1st party dependencies go here.
const applicationDependencies = new ContainerModule((bind) => {
	//System
	bind<IFsm>(TYPES.Fsm).to(Fsm);
	bind<IStack<IState>>(TYPES.Stack).to(Stack);
	bind<ICanvasResource>(TYPES.CanvasResource).to(CanvasResource).inSingletonScope();
	bind<ISession>(TYPES.Session).to(Session).inSingletonScope();

	//Graphics
	bind<IColor>(TYPES.Color).to(Color);
	bind<ICssColor>(TYPES.CssColor).to(CssColor);
	bind<IVector2d>(TYPES.Vector2d).to(Vector2d);
	bind<IVector2d>(TYPES.Vector2dMath).to(Vector2dMath);
	bind<DrawableCircle>(TYPES.DrawCircle).to(DrawableCircle);
	bind<Circle>(TYPES.Circle).to(Circle);

	//Game
	bind<IGame>(TYPES.Game).to(Game).inSingletonScope();
	bind<LoadSessionState>(TYPES.LoadSessionState).to(LoadSessionState);
	bind<LoadAudioState>(TYPES.LoadAudioState).to(LoadAudioState);
	bind<IntroState>(TYPES.IntroState).to(IntroState);
	bind<StageState>(TYPES.StageState).to(StageState);
	bind<EntityManager>(TYPES.EntityManager).to(EntityManager).inSingletonScope();
	bind<Player>(TYPES.Player).to(Player).inSingletonScope();
	bind<IPianoKey>(TYPES.PianoKey).to(PianoKey);
	bind<Piano>(TYPES.Piano).to(Piano);
	bind<interfaces.Newable<IPianoKey>>(TYPES.NewablePianoKey).toConstructor<IPianoKey>(PianoKey);
	bind<interfaces.Newable<IColor>>(TYPES.NewableColor).toConstructor<IColor>(Color);
	bind<interfaces.Newable<ICssColor>>(TYPES.NewableCssColor).toConstructor<ICssColor>(CssColor);
	bind<interfaces.Newable<IVector2d>>(TYPES.NewableVector2d).toConstructor<IVector2d>(Vector2d);
	bind<Set<Projectile>>(TYPES.Projectiles).toConstantValue(projectiles);

	//Audio
	bind<Audio>(TYPES.Audio).to(Audio).inSingletonScope();
});

const container = new Container();
container.load(thirdPartyDependencies, applicationDependencies);

export { container };
