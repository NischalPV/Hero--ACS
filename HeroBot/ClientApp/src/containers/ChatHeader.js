"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var constants_1 = require("../../src/constants");
var ChatHeader_1 = require("../components/ChatHeader");
var sideEffects_1 = require("../core/sideEffects");
var utils_1 = require("../utils/utils");
var mapStateToProps = function (state) { return ({
    threadMembers: state.threadMembers.threadMembers,
    topic: state.thread.topic,
    userId: state.contosoClient.user.identity,
    existsTopicName: state.thread.topic !== constants_1.GUID_FOR_INITIAL_TOPIC_NAME,
    generateHeaderMessage: function () {
        var header = 'Chat with ';
        if (state.threadMembers === undefined) {
            header += 'yourself';
            return header;
        }
        var members = state.threadMembers.threadMembers.filter(function (member) { return !utils_1.isUserMatchingIdentity(member.id, state.contosoClient.user.identity); });
        if (members.length === 0) {
            header += 'yourself';
            return header;
        }
        // if we have at least one other participant we want to show names for the first 3
        if (members.length > 0) {
            var namedMembers = members.slice(0, 3);
            header += namedMembers.map(function (member) { return member.displayName; }).join(', ');
        }
        // if we have more than 3 other participants we want to show the number of other participants
        if (members.length > 3) {
            var len = members.length - 3;
            header += " and " + len + " other participant" + (len === 1 ? '' : 's');
        }
        return header;
    }
}); };
var mapDispatchToProps = function (dispatch) { return ({
    removeChatParticipantById: function (userId) { return dispatch(sideEffects_1.removeThreadMemberByUserId(userId)); }
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChatHeader_1.default);
//# sourceMappingURL=ChatHeader.js.map