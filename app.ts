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

function Enumarable(isEnumarable: boolean = true): Function {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.enumerable = isEnumarable;
		return descriptor;
	};
}

function Writable(isWritable: boolean = true): Function {
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.writable = isWritable;
		return descriptor;
	};
}

function Configurable(isConfigurable: boolean = true): Function {
	return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.configurable = isConfigurable;
		return descriptor;
	};
}

function Value(value: any) {
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		descriptor.value = value;
		return descriptor;
	};
}

@ClassDec(666)
class Shape {
	//@Value(false)
	public get x() {return this._x;}
	public get y() {return this._y;}
	constructor(private _x: number = 0, private _y: number = 0) {}
}
declare const jQuery: any;

function Foo() {
	this.x = 2;
	this.y = 8;
}

function ClassDec(value: number) {
	return (target: Function) => {
		Reflect.defineMetadata(TYPES.Circle, value, target);
	};
}

namespace SynesthesiaSymphony {
	/*
	const shape: Shape = new Shape();
	const f: number = 2;
	const res = Reflect.getMetadata(TYPES.Circle, shape.constructor);

	debugger;
	*/

	//Here we use InversifyJS' Inversion of Control container to resolve dependencies.
	const game: IGame = container.get<IGame>(TYPES.Game);

	//Start the game loop.
	game.main();
}
