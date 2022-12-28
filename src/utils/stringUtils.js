const dateFormat = require('dateformat');
const randomString = require('random-string');

exports.genIdentity = (req, protocolMethod) => {
    let identity

    if (protocolMethod.toUpperCase() == 'POST') {
      identity = (req.body.mobile_no == undefined) ? '' : `${req.body.mobile_no}`
      identity += ':'.concat((req.body.mobile_id_sn == undefined) ? '' : `${req.body.mobile_id_sn}`)
    }
    identity += ':'/* .concat((req.body. == undefined) ? '' : `${req.body.}`) */
    return identity
  }
  
  exports.getRawHeaders = (rawHeaders) => {
    let objRaw = {};
    for (let i = 0; i < rawHeaders.length; i += 2) {
      let key = rawHeaders[i];
      let value = rawHeaders[i + 1];
      objRaw[key] = value;
    }
    return objRaw;
  }

  exports.genResHeaders = (headers) => {
    let resHeader = {}
    resHeader['Network-User'] = headers['network-user'];
    resHeader['Content-Type'] = 'application/json; charset=utf-8'
    return resHeader;
  }

  exports.generateXTid = (nodeName) => {
    var now = new Date();
    let date = dateFormat(now, "yymmdd");
    let commandId = nodeName + "-" + date + "-";
    let remaininglength = 22 - commandId.length ;
    commandId += randomString({length:remaininglength});
    return commandId;
  }
  