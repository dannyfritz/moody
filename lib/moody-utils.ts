'use strict';

import _ = require('lodash');
import { State, StateCallback } from './State';

/**
	@method callCallback
	@private
	@param source {Object} Object bound to `this`
	@param callbackNAme {String}
	@param [args] {Array}
*/
export function callCallback (source : any, callback : StateCallback, args? : IArguments | any[]) : any {
	if (!_.isFunction(source[callback])) {
		return source[callback];
	}
	return source[callback].apply(source, args);
}
