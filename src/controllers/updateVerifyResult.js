const { mobileid_invoke } = require('../service')
const log = require('commonlog-kb')
const configParam = require('../../param');
const status = require('../../param/status')
const stringUtils = require('../utils/stringUtils')
const serviceNode = require('../../param/serviceNode')
const commandName = require('../../param/commandName')
const basicFunction = require('../service/basicFunction')

const updateVerifyResult = async (req, res) => {
  let appLog = req.logbk
  let cmd = commandName.POST_UPDATE_RESULT
  let reqNodeName = serviceNode.CLIENT;
  let resHeaders
  try {
    let {
      url: reqUrl,
      headers: reqHeaders,
      body: reqBody,
      rawHeaders: reqRawHeaders
    } = req

    let rawHeaders = stringUtils.getRawHeaders(reqRawHeaders);
    let initInvoke = req.xTid
    resHeaders = stringUtils.genResHeaders(rawHeaders);
    resHeaders = { ...resHeaders, initInvoke: req.xTid }
    let protocol = req.protocol.toUpperCase();
    let protocolMethod = req.method;

    detailLog = log.detail(req.session, initInvoke, cmd, '');
    appLog.info('COMMAND ' + cmd);

    let dataDetailLog = {
      Header: rawHeaders,
      Body: reqBody,
      Url: req.url
    }

    const options = {
      chaincodeId: configParam.chaincodeName,
      fcn: 'recordVerificationResult',
      args: [JSON.stringify(req.body)],
      channelId: configParam.channelName,
    }

    appLog.info('URL ', reqUrl);
    appLog.info('HEADERS ', reqHeaders);
    appLog.info('BODY ', reqBody);

    detailLog.addInputRequest(reqNodeName, cmd, initInvoke, JSON.stringify(dataDetailLog.Body), dataDetailLog, protocol, protocolMethod);
    const result = await mobileid_invoke(req.networkUser, options, appLog)
    return res.json(basicFunction.buildRecordConsentLog(status.SUCCESS, result, detailLog, protocolMethod, resHeaders, appLog))
    // res.json(result)
  } catch(e) {
    appLog.error(e.message)
    if (typeof e.status === 'undefined'){
      if (e.message.search(", status=") >= 0){
        e.status = e.message.substr(e.message.search(", status=")+9,3)
      }
      else{
        e.status = "500"
      }
    }
    return res.status(e.status).json(basicFunction.buildRecordConsentLog(status.SYSTEM_ERROR, { error: e.message }, detailLog, req.method, resHeaders, appLog));
    // res.status(e.status).json({ error: e.message })
  }
}

module.exports = updateVerifyResult
