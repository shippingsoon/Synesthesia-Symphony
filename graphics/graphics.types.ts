/**
 * @file Graphics types
 * @copyright 2014 Shipping Soon
 * @license GPLv3
 * @see {@link https://github.com/shippingsoon/Synesthesia-Symphony} for sourcecode
 * @see {@link https://www.shippingsoon.com/synesthesia-symphony} for online demo
 */

/**
 * Interface for classes that represent a color.
 * @interface
 * @const
 */
export interface ColorType {
	readonly r: number;
	readonly g?: number;
	readonly b?: number;
	readonly a?: number;
}

/**
 * Defines classes that can be drawn to the screen.
 * @interface
 */
export interface Drawable {
	render(ctx: CanvasRenderingContext2D): void;
}

/**
 * @type ColorName
 */
export type ColorName =
	'transparent' | 'aliceblue' | 'antiquewhite' | 'aqua' |
	'aquamarine' | 'azure' | 'beige' | 'bisque' |
	'black' | 'blanchedalmond' | 'blue' | 'blueviolet' |
	'brown' | 'burlywood' | 'cadetblue' | 'chartreuse' |
	'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' |
	'crimson' | 'cyan' | 'darkblue' | 'darkcyan' |
	'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' |
	'darkkhaki' | 'darkmagenta' | 'darkolivegreen' | 'darkorange' |
	'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' |
	'darkslateblue' | 'darkslategray' | 'darkslategrey' | 'darkturquoise' |
	'darkviolet' | 'deeppink' | 'deepskyblue' | 'dimgray' |
	'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' |
	'forestgreen' | 'fuchsia' | 'gainsboro' | 'ghostwhite' |
	'gold' | 'goldenrod' | 'gray' | 'green' |
	'greenyellow' | 'grey' | 'honeydew' | 'hotpink' |
	'indianred' | 'indigo' | 'ivory' | 'khaki' |
	'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' |
	'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' |
	'lightgray' | 'lightgreen' | 'lightgrey' | 'lightpink' |
	'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' |
	'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'lime' |
	'limegreen' | 'linen' | 'magenta' | 'maroon' |
	'mediumaquamarine' | 'mediumblue' | 'mediumorchid' | 'mediumpurple' |
	'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' |
	'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' |
	'moccasin' | 'navajowhite' | 'navy' | 'oldlace' |
	'olive' | 'olivedrab' | 'orange' | 'orangered' |
	'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' |
	'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' |
	'pink' | 'plum' | 'powderblue' | 'purple' |
	'red' | 'rosybrown' | 'royalblue' | 'saddlebrown' |
	'salmon' | 'sandybrown' | 'seagreen' | 'seashell' |
	'sienna' | 'silver' | 'skyblue' | 'slateblue' |
	'slategray' | 'slategrey' | 'snow' | 'springgreen' |
	'steelblue' | 'tan' | 'teal' | 'thistle' |
	'tomato' | 'turquoise' | 'violet' | 'wheat' |
	'white' | 'whitesmoke' | 'yellow' | 'yellowgreen'
;

/**
 * Typeguard
 * @param colorName
 * @return {boolean}
 */
export function isColorName(colorName: ColorName | ColorType | {r?: number, g?: number, b?: number, a?: number}): colorName is ColorName {
	return typeof colorName === 'string';
}

/**
 * Typeguard
 * @param vector
 * @return {boolean}
 */
export function isVector(vector: VectorType | any): vector is VectorType {
	return typeof vector.x !== 'undefined' && typeof vector.y !== 'undefined';
}


/**
 * Defines a vector.
 * @interface
 * @const
 */
export interface VectorType {
	readonly x: number;
	readonly y: number;
}
