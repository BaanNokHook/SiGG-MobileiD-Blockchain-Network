const { mobileid_query } = require('../service')
const configParam = require('../../param');

const getConsentLog = async (req, res) => {
  try {
    const options = {
      chaincodeId: configParam.chaincodeName,
      fcn: 'getConsentLog',
      args: [JSON.stringify(req.body)],
      channelId: configParam.channelName,
    }
    const result = await mobileid_query(req.networkUser, options)
    res.json(result)
  } catch(e) {
    console.log(e.message)
    if (typeof e.status === 'undefined'){
      if (e.message.search(", status=") >= 0){
        e.status = e.message.substr(e.message.search(", status=")+9,3)
      }
      else{
        e.status = "500"
      }
    }
    res.status(e.status).json({ error: e.message })
  }
}

module.exports = getConsentLog