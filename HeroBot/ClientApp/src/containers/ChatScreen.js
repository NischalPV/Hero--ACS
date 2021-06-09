"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var ChatScreen_1 = require("../components/ChatScreen");
var mapStateToProps = function (state) { return ({
    isRemoved: state.threadMembers.isRemoved
}); };
exports.default = react_redux_1.connect(mapStateToProps)(ChatScreen_1.default);
//# sourceMappingURL=ChatScreen.js.map