'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const configParam = require('../../param');

const ccpPath = path.resolve(process.cwd(), '', 'connection.json');
//const walletPath = "../../javascript/wallet";

const mobileid_invoke = async (enrollmentID, queryOptions, appLog) => {
  let response = null
   try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    // console.log(`Wallet path: ${walletPath}`);
    appLog.debug(`Wallet path: ${walletPath}`)
    //throw new Error(`Wallet path: ${walletPath}`);
    
    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(enrollmentID);
    if (!userExists) {
        appLog.debug(`An identity for the user ${enrollmentID}  does not exist in the wallet`);
        // console.log('An identity for the user "' + enrollmentID +'" does not exist in the wallet');
        return;
    }
    
    // Create a new gateway for connecting to our peer node.
    appLog.debug('Create a new gateway for connecting to our peer node')
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: enrollmentID, discovery: { enabled: false, asLocalhost: false } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(configParam.channelName);

    // Get the contract from the network.
    const contract = network.getContract(configParam.chaincodeName);
    //const contract = network.getContract(queryOptions.chaincodeId);

    appLog.debug(`Args >> ${queryOptions.args}`)
    // console.log("Args >>"+queryOptions.args);

    // Evaluate the specified transaction.
    response = await contract.submitTransaction(queryOptions.fcn, queryOptions.args[0]);
    appLog.debug('Transaction has been submitted')
    // console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    appLog.debug('Disconnect from the gateway.')
    await gateway.disconnect();

    try{
      // console.log(response.toString())
      appLog.debug(response.toString())
      return JSON.parse(response.toString())
    }catch(e){
      // console.log("status:OK")
      appLog.debug('status:OK')
      return JSON.parse('{"status":"OK","msg":"Operation is successful"}')
    }
    
  } catch (e) {
    appLog.error(e)
    // console.log(e)
    throw e 
  }
}

module.exports = mobileid_invoke
