// The main file that is included when you run `require("gpii-express")`.
//
// You can optionally load testing support by assigning a variable to the results of `require` and calling
// `loadTestingSupport`, as in:
//
//      var gpiiExpress = require("gpii-express");
//      gpiiExpress.loadTestingSupport();
//
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

fluid.registerNamespace("gpii.express");
fluid.module.register("gpii-express", __dirname, require);

// `gpii.express`, a component for express itself
require("./src/js/express");

// A configuration holder to allow express-like things to work without express itself (for example, in unit tests).
require("./src/js/configholder");

// `gpii.express.middleware`, the base grade for all middleware components
require("./src/js/middleware");

// A middleware component to add support for cookies
require("./src/js/cookieparser");

// A middleware component to add support for sessions (requires cookie support)
require("./src/js/session");

// A middleware component to add support for handling JSON data in POST requests, etc.
require("./src/js/json");

// A middleware component to add support for URL encoding of variables
require("./src/js/urlencoded");

// `gpii.express.router`, the base grade for all router components
require("./src/js/router");

// A router module to handle static content.  Wraps the built-in `express.static()` module.
require("./src/js/static");

// A convenience grade on which "request handler" components are based
require("./src/js/handler");

// A convenience router that creates a request aware grade for each request
require("./src/js/requestAwareRouter");

// A convenience router to handle multiple content types from the same router.
require("./src/js/contentAwareRouter");

// An intermediate router that can be used to combine existing middleware and routers.
require("./src/js/passthroughRouter");

// Provide a function to optionally load test support.
gpii.express.loadTestingSupport = function () {
    require("./tests/js/lib/test-helpers");
};

module.exports = gpii.express;