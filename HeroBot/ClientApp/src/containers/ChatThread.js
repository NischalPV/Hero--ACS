"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var ChatThread_1 = require("../components/ChatThread");
var sideEffects_1 = require("../core/sideEffects");
var constants_1 = require("../constants");
var utils_1 = require("../utils/utils");
var mapStateToProps = function (state) { return ({
    messages: state.chat.messages,
    user: state.contosoClient.user,
    users: state.contosoClient.users,
    failedMessages: state.chat.failedMessages,
    isYourLatestMessage: function (messageId, messages) {
        var latestArrivalTime = -1;
        var latestMessageId = undefined;
        for (var i = 0; i < messages.length; i++) {
            var date = messages[i].createdOn;
            if (messages[i].sender.communicationUserId === state.contosoClient.user.identity &&
                messages[i] &&
                new Date(date) >= new Date(latestArrivalTime)) {
                latestArrivalTime = messages[i].createdOn;
                latestMessageId = messages[i].id;
            }
        }
        // we know the message we are rendering is not our latest message so we dont want to render a seen component
        if (messageId !== latestMessageId || latestMessageId === undefined) {
            return false;
        }
        return true;
    },
    isLargeParticipantsGroup: function () {
        return state.threadMembers.threadMembers.length >= constants_1.PARTICIPANTS_THRESHOLD;
    },
    isMessageSeen: function (clientMessageId, messages) {
        if (!state.conversations.receipts || state.conversations.receipts.length === 0) {
            return false;
        }
        var message = messages.find(function (message) { return message.clientMessageId === clientMessageId; });
        var latestArrivalTime = message ? message.createdOn : -1;
        var numSeen = state.conversations.receipts.filter(function (receipt) {
            var _a;
            if (utils_1.isUserMatchingIdentity(receipt.sender, state.contosoClient.user.identity))
                return false; //don't count sender's own read receipt
            var readMessagecreatedOn = (_a = messages.find(function (message) { return message.id === receipt.chatMessageId; })) === null || _a === void 0 ? void 0 : _a.createdOn;
            return new Date(readMessagecreatedOn) >= new Date(latestArrivalTime);
        }).length;
        return numSeen > 0 ? true : false;
    },
    isYourLatestSeenMessage: function (clientMessageId, MessagesWithSeen) {
        var latestArrivalTime = -1;
        var latestMessageId = undefined;
        for (var i = 0; i < MessagesWithSeen.length; i++) {
            var date = MessagesWithSeen[i].createdOn;
            if (MessagesWithSeen[i].isSeen &&
                MessagesWithSeen[i].sender.communicationUserId === state.contosoClient.user.identity &&
                MessagesWithSeen[i] &&
                new Date(date) >= new Date(latestArrivalTime)) {
                latestArrivalTime = MessagesWithSeen[i].createdOn;
                latestMessageId = MessagesWithSeen[i].clientMessageId;
            }
        }
        if (clientMessageId !== latestMessageId || latestMessageId === undefined) {
            return false;
        }
        return true;
    }
}); };
var mapDispatchToProps = function (dispatch) { return ({
    sendReadReceipt: function (messages, userId) {
        // if you have no messages, you haven't seen any messages to send a read receipt for
        if (!messages || messages.length === 0) {
            return;
        }
        var latestArrivalTime = -1;
        var latestMessageId = undefined;
        for (var i = 0; i < messages.length; i++) {
            var date = messages[i].createdOn;
            if (messages[i].sender.communicationUserId !== userId && new Date(date) > new Date(latestArrivalTime)) {
                latestArrivalTime = messages[i].createdOn;
                latestMessageId = messages[i].id;
            }
        }
        if (latestMessageId) {
            dispatch(sideEffects_1.sendReadReceipt(latestMessageId));
        }
    }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChatThread_1.default);
//# sourceMappingURL=ChatThread.js.map