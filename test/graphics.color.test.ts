/// <reference path="./../graphics/graphics.color.ts" />
/// <reference path="./../typings/modules/lodash/index.d.ts" />
/// <reference path="./../typings/globals/should/index.d.ts" />

//#region Imports
import 'should';
import * as _ from 'lodash';
import parseCSSColor = require('./../resource/js/css-color-parser/csscolorparser.js');
import Color = Symphony.Graphics.Color;
import ColorType = Symphony.Graphics.ColorType;
//import {expect, assert, should} from 'chai';
//#endregion

//#region Graphics.Color Class Unit Test
describe('Graphics.Color Class Unit Test', () => {
	let alpha:number;
	let red:number;
	let green:number;
	let blue:number;
	let color:Color;
	let colorType:ColorType;
	let regExp:RegExp;
	let regExpForRGBA:RegExp;
	let rgbaString:string;

	describe(`Getter/Setter Test`, () => {
		alpha = 1;
		red = 255;
		green = 0;
		blue = 0;
		color = new Color({r: red, g: green, b: blue, a: alpha});
		//color = new Color('red');
		rgbaString = 'rgba(255, 0, 0, 1)';

		it(`Color.getRGBA should match ${rgbaString}`, (done) => {
			color.getRGBA.should.equal(rgbaString);
			done();
		});

		it(`Color.getAlpha should be equal to ${alpha}`, (done) => {
			color.setAlpha = alpha;
			color.getAlpha.should.equal(alpha);
			done();
		});

		it(`Color.getRed should be equal to ${red}`, () => {
			color.setRed = red;
			color.getRed.should.equal(red);
		});

		it(`Color.getGreen should be equal to ${green}`, () => {
			color.setGreen = green;
			color.getGreen.should.equal(green);
		});

		it(`Color.getBlue should be equal to ${blue}`, () => {
			color.setBlue = blue;
			color.getBlue.should.equal(blue);
		});

		it(`Color.getColor should match test ColorType`, () => {
			colorType = {r: 1, g: 3, b: 2, a : 0};

			color.setColor(colorType);
			color.getColor().should.have.property('a');
			color.getColor().should.have.property('r');
			color.getColor().should.have.property('g');
			color.getColor().should.have.property('b');
			_.isEqual(color.getColor(), colorType).should.be.true();
		});
	});

	describe(`Regular Expression Test`, () => {
		//This regular expression matches rgba(###, ###, ###, #)
		regExpForRGBA = new RegExp(/^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1})\)$/i);

		//This regular expression matches #000000
		regExp = new RegExp(/^#[0-9a-f]{6}$/i);

		it(`1 of 3 Color.getHex should match RegExp ${regExp.toString()}`, (done) => {
			color.setColor({r: 1, g: 3, b: 2, a : 0});
			color.getHex.should.match(regExp);
			done();
		});

		it(`2 of 3 Color.getHex should match RegExp ${regExp.toString()}`, (done) => {
			color.setColor({r: 0, g: 0, b: 0, a : 0});
			color.getHex.should.match(regExp);
			done();
		});

		it(`3 of 3 Color.getHex should match RegExp ${regExp.toString()}`, () => {
			color.setColor({r: 255, g: 255, b: 255, a : 1});
			color.getHex.should.match(regExp);
		});

		it(`1 of 2 Color.getRGBA should match RegExp ${regExpForRGBA.toString()}`, () => {
			color.setColor({r: 255, g: 255, b: 255, a : 1});
			color.getRGBA.should.match(regExpForRGBA);
		});

		it(`2 of 2 Color.getRGBA should match RegExp rgba(###, ###, ###, #)`, () => {
			color.setColor('black');
			color.getRGBA.should.match(regExpForRGBA);
		});
	});

	describe(`Exceptions Test`, () => {
		it(`Color.setColor() should throw new Error()`, () => {
			let c:ColorType = {r: 256, g: 999, b: 259, a : 200};
			let err:Error = new Error(`Invalid RGBA colors: rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);

			//(() => { color.setColor(c)}).should.throw();
			(() => { color.setColor(c)}).should.throw(err.message);
		});

		it(`Color.setColor() should throw new Error()`, () => {
			let c:ColorType =  {r: -2, g: -50000, b: -1, a : -2};
			let err:Error = new Error(`Invalid RGBA colors: rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);

			(() => { color.setColor(c)}).should.throw(err.message);
		});

		it(`Color.setColor() should throw new Error()`, () => {
			let colorName:string =  'foobar';
			let err:Error = new Error(`In Color.colorNameToObject(). Failed to set color: ${colorName}`);

			(() => { color.setColor(colorName)}).should.throw(err.message);
		});

		it(`Color.setColor() should NOT throw new Error()`, () => {
			(() => { color.setColor('red')}).should.not.throw();
		});
	});
});
//#endregion
