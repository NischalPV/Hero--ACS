"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var ChatArea_1 = require("../components/ChatArea");
var sideEffects_1 = require("../core/sideEffects");
var mapStateToProps = function (state) { return ({
    typingNotifications: state.chat.typingNotifications
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onUpdateTypingUsers: function () { return dispatch(sideEffects_1.updateTypingUsers()); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChatArea_1.default);
//# sourceMappingURL=ChatArea.js.map