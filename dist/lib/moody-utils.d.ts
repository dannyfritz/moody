import { StateCallback } from "./State";
/**
    @method callCallback
    @private
    @param source {Object} Object bound to `this`
    @param callbackNAme {String}
    @param [args] {Array}
*/
export declare function callCallback(source: any, callback: StateCallback, args?: IArguments | any[]): any;
