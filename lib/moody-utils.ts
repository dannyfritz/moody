import * as _ from "lodash"
import { StateCallback } from "./State"

/**
	@method callCallback
	@private
	@param source {Object} Object bound to `this`
	@param callbackNAme {String}
	@param [args] {Array}
*/
export function callCallback
(source: any, callback: StateCallback, args?: IArguments | any[]): any
{
  if (!_.isFunction(source[callback]))
  {
    return source[callback]
  }
  return source[callback].apply(source, args)
}
