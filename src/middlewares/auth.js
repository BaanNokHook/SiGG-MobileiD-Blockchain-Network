const log = require('commonlog-kb')
const status = require('../../param/status')
const stringUtils = require('../utils/stringUtils')
const serviceNode = require('../../param/serviceNode')
const basicFunction = require('../service/basicFunction')
const auth = (req, res, next) => {
	  let appLog = req.logbk
	  let reqNodeName = serviceNode.CLIENT
	  let cmd = 'unknow'
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

		      detailLog = log.detail(req.session, initInvoke, '', '');

		      let dataDetailLog = {
			            Header: rawHeaders,
			            Body: reqBody,
			            Url: req.url
			          }

		      appLog.info('URL ', reqUrl);
		      appLog.info('HEADERS ', reqHeaders);
		      appLog.info('BODY ', reqBody);
		      detailLog.addInputRequest(reqNodeName, cmd, initInvoke, JSON.stringify(dataDetailLog.Body), dataDetailLog, protocol, protocolMethod);

		      if (req.headers['network-user']) {
			            req.networkUser = req.headers['network-user']
			            next()
			          }
		      else {
			            throw new e
			          }
		    }
	  catch (e) {
		if (typeof e.status === 'undefined') {
				if (e.message.search(", status=") >= 0) {
						e.status = e.message.substr(e.message.search(", status=") + 9, 3)
						}
				else {
						e.status = "403"
						}
				}
		res.status(e.status).json({ error: 'status=403, username is required' })
			appLog.error('username is required')
				return res.status(e.status).json(basicFunction.buildRecordConsentLog(status.MISSING_OR_INVALID_PARAMETER, '', detailLog, req.method, resHeaders, appLog));
			}
		}

module.exports = auth


//const auth = (req, res, next) => {
//  if (req.headers['network-user']) {
//    req.networkUser = req.headers['network-user']
//    next()
//  } else {
//    res.status(e.message.substr(e.message.search(", status=")+9,3)).json({ error: 'username is required' })
//  }
//}
//module.exports = auth
