/* global module */
/**
 * @fileoverview Rule to flag wildcard targets in postMessage
 * @author Frederik Braun
 * @copyright 2015 Mozilla Corporation. All rights reserved.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    "use strict";
    return {
        CallExpression: function (node) {
            // postMessage and somewindow.postMessage
            var funcName = node.callee.name || node.callee.property.name;
            if (funcName === "postMessage") {
                if (node.arguments.length > 1) {
                    if ((node.arguments[1].type === "Literal") &&
                        (node.arguments[1].value === "*")) {
                        context.report(node, "Using postMessage() with" +
                          " wildcard targets is not allowed.")
                    }
                } else {
                    return;
                }

            }
        }
    };

};
