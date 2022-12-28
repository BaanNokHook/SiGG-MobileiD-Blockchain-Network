const serviceNode = require('../../param/serviceNode');
const commandName = require('../../param/commandName');


module.exports.buildRecordConsentLog = function (status, dataRes, detailLog, method, resHeaders, appLog) {
    let command
    let datadetailLog = {}
    let responseMessage = {
		            resultCode: status.RESULT_CODE,
		            developerMessage: status.DEVELOPER_MESSAGE
        }

    if (method == 'POST') {
        command = commandName.POST_RECORD_CONSENT
        if (status.RESULT_CODE == '20000') {
            responseMessage.dataRes = dataRes
        }
        else {
            responseMessage.error = dataRes.error
        }
        datadetailLog.Header = resHeaders,
        datadetailLog.Body = responseMessage
    }
    appLog.info("responseMessage: ", responseMessage);
    detailLog.addOutputResponse(serviceNode.CLIENT, command, resHeaders.initInvoke, JSON.stringify(responseMessage), datadetailLog);
    detailLog.end();
    return responseMessage;

}
