"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var HomeScreen_1 = require("../components/HomeScreen");
var sideEffects_1 = require("../core/sideEffects");
var mapStateToProps = function () { return ({
    createThreadHandler: function () {
        sideEffects_1.createThread();
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps)(HomeScreen_1.default);
//# sourceMappingURL=HomeScreen.js.map