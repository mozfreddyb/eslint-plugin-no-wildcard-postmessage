/* global require */
/**
 * @fileoverview Test for no-wildcard-postmessage.js rule
 * @author Frederik Braun
 * @copyright 2015 Mozilla Corporation. All rights reserved
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../lib/rules/no-wildcard-postmessage.js");
var RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var eslintTester = new RuleTester();

var features = { templateStrings: true, spread: true };

eslintTester.run("no-wildcard-postmessage", rule, {

  valid: [
    {
      code: "postMessage(obj);",
      ecmaFeatures: features
    },
    {
      code: "frame.postMessage(obj, 'http://domain.tld');",
      ecmaFeatures: features
    },
    {
      code: "frame.postMessage(obj, 'http://domain.tld');",
      ecmaFeatures: features
    },
    {   // iife
      code: "(function() {})()",
      ecmaFeatures: features
    }


  ],

  // Examples of code that should trigger the rule
  invalid: [
    {
      code: "postMessage(obj, '*');",
      errors: [{
        message: "Using postMessage() with wildcard targets is not allowed.",
        type: "CallExpression"
      }],
      ecmaFeatures: features
    },
    {
      code: "postMessage(obj, '*');",
      errors: [{
        message: "Using postMessage() with wildcard targets is not allowed.",
        type: "CallExpression"
      }],
      ecmaFeatures: features
    },
    {
      code: "win.postMessage(obj, '*');",
      errors: [{
        message: "Using postMessage() with wildcard targets is not allowed.",
        type: "CallExpression"
      }],
      ecmaFeatures: features
    }
  ]
});
