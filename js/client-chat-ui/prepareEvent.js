var clientChatUiPrepareEvent = function (event) {
    var i18n = clientChatUiI18n();

    function updateEventData(event, msg, originalMsg, fromClass) {
        event.msg = msg;
        event.originalMsg = originalMsg;
        if (!commonUtilService.isUndefined(fromClass)) {
            event.fromClass = fromClass
        }
    }

    switch (event.event) {
        case commonConstants.events.chat.session.PARTY_JOINED:
            updateEventData(event, i18n.agentJoinedMessage, event.msg);
            break;
        case commonConstants.events.chat.session.PARTY_LEFT:
            updateEventData(event, i18n.agentLeftMessage, event.msg);
            break;
        case commonConstants.events.chat.session.NETWORK_CONNECTION_ERROR:
            updateEventData(event, i18n.networkConnectionErrorMessage, event.msg);
            break;
        case commonConstants.events.chat.session.NETWORK_CONNECTION_ESTABLISHED:
            updateEventData(event, i18n.networkConnectionEstablishedMessage, event.msg);
            break;
        case commonConstants.events.chat.session.ENDED:
            updateEventData(event, i18n.sessionEndedMessage, event.msg);
            break;
        case commonConstants.events.chat.session.TIMEOUT_WARNING:
            updateEventData(event, i18n.inactivityWarningMessage, event.msg);
            break;
        case commonConstants.events.chat.session.INACTIVITY_TIMEOUT:
            updateEventData(event, i18n.inactivityTimeoutMessage, event.msg);
            break;
        case commonConstants.events.chat.session.COBROWSING_REQUESTED:
            updateEventData(event, i18n.cobrowsingRequestedMessageText, event.msg);
            break;
        case commonConstants.events.chat.session.COBROWSING_REJECTED:
            updateEventData(event, i18n.cobrowsingRejectedMessageText, event.msg);
            break;
        case commonConstants.events.chat.session.COBROWSING_STARTED:
            updateEventData(event, i18n.cobrowsingStartedMessageText, event.msg);
            break;
        case commonConstants.events.chat.session.COBROWSING_ENDED:
            updateEventData(event, i18n.cobrowsingEndedMessageText, event.msg);
            break;
        case commonConstants.events.chat.session.FILE: {
            var historyStyle = event.history ? 'style="display: none;"' : '';
            var link = '<a target="_blank" href="__href__" ' + historyStyle + ' class="msg-file-link">__text__</a>';
            var text = '';
            var originalMsg, msg;
            if (event.file_type === 'image') {
                originalMsg = event.fromName + ' ' + i18n.imageWasSent;
                text = '<img class="thumb" style="vertical-align: top;" src="' + event.fileUrl + '" />';
            } else {
                originalMsg = event.fromName + ' ' + i18n.fileWasSent + ' "' + event.file_name + '"';
                text = "Download \"" + event.file_name + "\"";
            }
            msg = link.replace("__href__", event.fileUrl).replace("__text__", text);
            if (event.history) {
                msg += (
                    '<span class="msg-file-stub">' +
                        i18n.file + ' "' + event.file_name + '" ' + i18n.isNotAvailable +
                    '</span>'
                );
            }
            updateEventData(event, msg, originalMsg);
            break;
        }
        case 'date-message': {
            var msg = dateFormat(parseInt(event.date), dateFormat.masks.mediumDate);
            updateEventData(event, msg, msg);
            break;
        }
        default : {
            var msg = event.msg ? clientChatUiEscapeHtml(event.msg, false) : undefined;
            updateEventData(event, msg, event.msg);
            break;
        }
    }
    return event;
};
