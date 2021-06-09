"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var SendBox_1 = require("../components/SendBox");
var sideEffects_1 = require("../core/sideEffects");
var constants_1 = require("../constants");
var mapStateToProps = function (state) { return ({
    user: state.contosoClient.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onSendMessage: function (messageContent) {
        console.log('----------message typed---------');
        dispatch(sideEffects_1.sendMessage(messageContent));
    },
    onSendTypingNotification: function (lastSentTypingNotificationDate, setLastSentTypingNotificationDate) {
        var currentDate = new Date();
        var timeSinceLastSentTypingNotificationMs = currentDate.getTime() - lastSentTypingNotificationDate;
        if (timeSinceLastSentTypingNotificationMs >= constants_1.MINIMUM_TYPING_INTERVAL_IN_MILLISECONDS) {
            dispatch(sideEffects_1.sendTypingNotification());
            setLastSentTypingNotificationDate(currentDate.getTime());
        }
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SendBox_1.default);
//# sourceMappingURL=SendBox.js.map