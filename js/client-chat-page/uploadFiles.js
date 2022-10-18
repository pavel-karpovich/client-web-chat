var clientChatPageUploadFiles = function (files) {

    function upload(cp, formData) {
        var uploadFilesEndpoint = 'files?tenantUrl=' + encodeURIComponent(cp.tenantUrl);
        return chatApiSessionSendXhr(cp, uploadFilesEndpoint, 'POST', formData);
    }

    function uploadFile(file) {
        var formData = new FormData();
        var id = clientChatPageMakeId();
        var sessionId = sessionStorage.getItem('sp-chat-session');
        formData.append("file-upload-input", file);
        $.chatUI.appendLog({
            fromClass: "me",
            msg: "Uploading \"" + file.name + "\"",
            msgId: id,
            sessionId: sessionId
        });
        upload(window.chatSession.cp, formData)
            .fail(function (fail) {
                var errorMessage = '';
                if (fail && fail.responseJSON) {
                    errorMessage = fail.responseJSON.error_message || '';
                }
                $('#' + sessionId + '-' + id).detach();
                $.chatUI.appendLog({fromClass: "sys", msg: "Error: " + errorMessage});
            })
            .done(function (done) {
                $('#' + sessionId + '-' + id).detach();
                if (done && done.file_id) {
                    if (window.chatSession) {
                        var type = 'attachment';
                        if (file.type.match('image.*')) {
                            type = 'image';
                        } else {
                            clientChatPageUpdateScrollbar();
                        }

                        window.chatSession.fileUploaded(done.file_id, type, done.file_name);
                    }
                }
            });
    }

    for (var i = 0, item; item = files[i]; i++) {
        uploadFile(item);
    }
    sessionStorage.setItem("blockConnectionInterruptCheck", false);
};
