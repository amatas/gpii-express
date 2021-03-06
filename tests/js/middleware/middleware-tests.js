/* Tests for the "middleware" grade and "wrapper" modules for common Express middleware. */
"use strict";
var fluid = require("infusion");
var gpii  = fluid.registerNamespace("gpii");

// Load all of the components to be tested and our test cases
require("../includes.js");
require("./test-middleware-counter");

// We borrow a router from the router tests to help in testing middleware isolation
require("../router/test-router-hello");
require("../router/test-router-reqview");
require("./test-router-cookiesetter");

require("./middleware-caseholder");

fluid.defaults("gpii.express.tests.middleware.testEnvironment", {
    gradeNames: ["fluid.test.testEnvironment"],
    port:   7531,
    baseUrl: "http://localhost:7531/",
    events: {
        constructServer: null,
        onStarted: null
    },
    components: {
        express: {       // instance of component under test
            createOnEvent: "constructServer",
            type: "gpii.express",
            options: {
                events: {
                    onStarted: "{testEnvironment}.events.onStarted"
                },
                config: {
                    express: {
                        port: "{testEnvironment}.options.port",
                        baseUrl: "{testEnvironment}.options.baseUrl",
                        views:   "%gpii-express/tests/views",
                        session: {
                            secret: "Printer, printer take a hint-ter."
                        }
                    }
                },
                components: {
                    middleware: {
                        type: "gpii.express.tests.middleware.counter"
                    },
                    cookie: {
                        type: "gpii.express.tests.router.cookie"
                    },
                    hello: {
                        type: "gpii.express.tests.router.hello",
                        options: {
                            components: {
                                reqview: {
                                    type: "gpii.express.tests.router.reqview",
                                    options: {
                                        path: "/rv",
                                        components: {
                                            reqviewChild: {
                                                type: "gpii.express.tests.router.hello",
                                                options: {
                                                    path:    "/jailed",
                                                    message: "This is provided by a module nested four levels deep.",
                                                    components: {
                                                        cookieparser: {
                                                            type: "gpii.express.middleware.cookieparser"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                world: {
                                    type: "gpii.express.tests.router.hello",
                                    options: {
                                        components: {
                                            session: {
                                                type: "gpii.express.middleware.session"
                                            }
                                        },
                                        path:    "/world",
                                        message: "Hello, yourself"
                                    }
                                }
                            }
                        }
                    },
                    reqview: {
                        type: "gpii.express.tests.router.reqview",
                        options: {
                            components: {
                                json: {
                                    type: "gpii.express.middleware.bodyparser.json"
                                },
                                urlencoded: {
                                    type: "gpii.express.middleware.bodyparser.urlencoded"
                                },
                                cookieparser: {
                                    type: "gpii.express.middleware.cookieparser"
                                },
                                session: {
                                    type: "gpii.express.middleware.session"
                                }
                            }
                        }
                    }
                }
            }
        },
        testCaseHolder: {
            type: "gpii.express.tests.middleware.caseHolder"
        }
    }
});

gpii.express.tests.middleware.testEnvironment();
