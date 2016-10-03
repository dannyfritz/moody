"use strict";
var _ = require("lodash");
/**
    @method callCallback
    @private
    @param source {Object} Object bound to `this`
    @param callbackNAme {String}
    @param [args] {Array}
*/
function callCallback(source, callback, args) {
    if (!_.isFunction(source[callback])) {
        return source[callback];
    }
    return source[callback].apply(source, args);
}
exports.callCallback = callCallback;
//# sourceMappingURL=moody-utils.js.map