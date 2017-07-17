/**
 * @file Inversify configuration
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './bootstrap.types';
import { Color } from '../graphics/graphics.color';
import { CssColor } from '../graphics/graphics.css-color';
import { Fsm } from '../system/system.fsm';
import { StateStack } from '../system/system.state-stack';
import { State } from '../system/system.state';
import { Vector } from '../graphics/graphics.vector';
import { Shape } from '../graphics/shape/graphics.shape';
import { CircleShape } from '../graphics/shape/graphics.circle-shape';
import { Circle } from '../graphics/shape/graphics.circle';
import { SquareShape } from '../graphics/shape/graphics.square-shape';
import { Square } from '../graphics/shape/graphics.square';
import { CanvasResource } from '../system/system.canvas-resource';
import { Game } from '../game/game';
import { LoadState } from '../game/state/game.load-state';
import { IColor, ICssColor, IVector } from '../graphics/graphics.types';
import { IFsm, IState } from '../system/system.types';
import { Session } from '../system/system.session';
import {ISession} from '../game/game.types';

const container = new Container();

//System
container.bind<IFsm>(TYPES.Fsm).to(Fsm);
container.bind<StateStack>(TYPES.StateStack).to(StateStack);
container.bind<CanvasResource>(TYPES.CanvasResource).to(CanvasResource);
container.bind<Session>(TYPES.Session).to(Session).inSingletonScope();

//Graphics
container.bind<IColor>(TYPES.Color).to(Color);
container.bind<ICssColor>(TYPES.CssColor).to(CssColor);
container.bind<IVector>(TYPES.Vector).to(Vector);
container.bind<CircleShape>(TYPES.CircleShape).to(CircleShape);
container.bind<Circle>(TYPES.Circle).to(Circle);
container.bind<SquareShape>(TYPES.SquareShape).to(SquareShape);
container.bind<Square>(TYPES.Square).to(Square);

//Game
container.bind<Game>(TYPES.Game).to(Game);
container.bind<LoadState>(TYPES.LoadState).to(LoadState);

export { container }
