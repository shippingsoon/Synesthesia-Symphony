/**
 * @file Inversify configuration
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { Container, ContainerModule } from 'inversify';
import 'reflect-metadata';
import { TYPES, Lodash } from './bootstrap.types';
import { Color } from '../graphics/graphics.color';
import { CssColor } from '../graphics/graphics.css-color';
import { Fsm } from '../system/system.fsm';
import { StateStack } from '../system/system.state-stack';
import { Vector } from '../graphics/graphics.vector';
import { CircleShape } from '../graphics/shape/graphics.circle-shape';
import { Circle } from '../graphics/shape/graphics.circle';
import { SquareShape } from '../graphics/shape/graphics.square-shape';
import { Square } from '../graphics/shape/graphics.square';
import { CanvasResource } from '../game/system.canvas-resource';
import { Game } from '../game/game';
import { LoadState } from '../game/state/game.load-state';
import { IColor, ICssColor, IVector } from '../graphics/graphics.types';
import { ICanvasResource, IFsm, IStateStack } from '../system/system.types';
import { Session } from '../system/system.session';
import {ISession} from '../game/game.types';
import * as _ from 'lodash';

const thirdPartyDependencies = new ContainerModule((bind) => {
	bind<Lodash>(TYPES.Lodash).toConstantValue(_);
	bind<Array<any>>(TYPES.Array).to(Array);
});

const applicationDependencies = new ContainerModule((bind) => {
	//System
	bind<IFsm>(TYPES.Fsm).to(Fsm);
	bind<IStateStack>(TYPES.StateStack).to(StateStack);
	bind<ICanvasResource>(TYPES.CanvasResource).toConstantValue(CanvasResource.getInstance());
	//bind<Session>(TYPES.Session).to(Session).inSingletonScope();

	//Graphics
	bind<IColor>(TYPES.Color).to(Color);
	bind<ICssColor>(TYPES.CssColor).to(CssColor);
	bind<IVector>(TYPES.Vector).to(Vector);
	bind<CircleShape>(TYPES.CircleShape).to(CircleShape);
	bind<Circle>(TYPES.Circle).to(Circle);
	bind<SquareShape>(TYPES.SquareShape).to(SquareShape);
	bind<Square>(TYPES.Square).to(Square);

	//Game
	bind<Game>(TYPES.Game).to(Game);
	bind<LoadState>(TYPES.LoadState).to(LoadState);
});

const container = new Container();
container.load(thirdPartyDependencies, applicationDependencies);

export { container };
