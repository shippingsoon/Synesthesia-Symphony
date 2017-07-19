/**
 * @file This file contains configuration for InversifyJS' IoC container.
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { Container, ContainerModule } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './inversify.types';
import { Color } from '../graphics/graphics.color';
import { CssColor } from '../graphics/graphics.css-color';
import { Fsm } from '../system/system.fsm';
import { Stack } from '../system/system.stack';
import { Vector } from '../graphics/graphics.vector';
import { CircleShape } from '../graphics/shape/graphics.circle-shape';
import { Circle } from '../graphics/shape/graphics.circle';
import { SquareShape } from '../graphics/shape/graphics.square-shape';
import { Square } from '../graphics/shape/graphics.square';
import { CanvasResource } from '../game/system.canvas-resource';
import { Game } from '../game/game';
import { LoadState } from '../game/state/game.load-state';
import { IColor, ICssColor, IVector } from '../graphics/graphics.types';
import { ICanvasResource, IFsm, IStack, IState, IWindow } from '../system/system.types';
import { IGame, ISession } from '../game/game.types';
import * as _ from 'lodash';
import { Session } from '../system/system.session';

//Let the IDE know this 3rd party MIDI.js module is defined elsewhere.
declare const MIDI: any;
declare const jQuery: any;

//3rd party dependencies go here.
const thirdPartyDependencies = new ContainerModule((bind) => {
	bind<Array<any>>(TYPES.Array).to(Array);
	bind<typeof _>(TYPES.Lodash).toConstantValue(_);
	bind<typeof MIDI>(TYPES.MIDI).toConstantValue(MIDI);
	bind<typeof jQuery>(TYPES.jQuery).toConstantValue(jQuery);
});

//1st party dependencies go here.
const applicationDependencies = new ContainerModule((bind) => {
	//System
	bind<IFsm>(TYPES.Fsm).to(Fsm);
	bind<IStack<IState>>(TYPES.Stack).to(Stack);
	bind<ICanvasResource>(TYPES.CanvasResource).to(CanvasResource).inSingletonScope();
	bind<ISession>(TYPES.Session).to(Session).inSingletonScope();
	//bind<IWindow>(TYPES.Window).toConstantValue(window);

	//Graphics
	bind<IColor>(TYPES.Color).to(Color);
	bind<ICssColor>(TYPES.CssColor).to(CssColor);
	bind<IVector>(TYPES.Vector).to(Vector);
	bind<CircleShape>(TYPES.CircleShape).to(CircleShape);
	bind<Circle>(TYPES.Circle).to(Circle);
	bind<SquareShape>(TYPES.SquareShape).to(SquareShape);
	bind<Square>(TYPES.Square).to(Square);

	//Game
	bind<IGame>(TYPES.Game).to(Game).inSingletonScope();
	bind<LoadState>(TYPES.LoadState).to(LoadState);
});

const container = new Container();
container.load(thirdPartyDependencies, applicationDependencies);

export { container };
