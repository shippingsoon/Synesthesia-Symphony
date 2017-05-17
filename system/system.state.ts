/*
 * @description - This is an interface for a game state.
 * @copyright - 2014 Shipping Soon
 * @license - GPLv3
 * @source - https://github.com/shippingsoon/Synesthesia-Symphony
 * @demo - https://www.shippingsoon.com/synesthesia-symphony/
 */

/// <reference path="./system.ts" />

namespace Symphony.System {
    /*
     * Game state interface.
     */
    export interface State {
        update(o:any):void;
        draw(o:any):void;
        start(o:any):void;
        stop?(o:any):void;
        play?(o:any):void;
        pause?(o:any):void;
    }
}

