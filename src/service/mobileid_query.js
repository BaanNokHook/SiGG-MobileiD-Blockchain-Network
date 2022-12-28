'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const configParam = require('../../param');

const ccpPath = path.resolve(process.cwd(), '', 'connection.json');
//const walletPath = "../../javascript/wallet";

const mobileid_query = async (enrollmentID, queryOptions) => {
  let response = null

   try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    //throw new Error(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(enrollmentID);
    if (!userExists) {
        console.log('An identity for the user "' + enrollmentID +'" does not exist in the wallet');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: enrollmentID, discovery: { enabled: false, asLocalhost: false } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(configParam.channelName);

    // Get the contract from the network.
    const contract = network.getContract(configParam.chaincodeName);
    //const contract = network.getContract(queryOptions.chaincodeId);

    console.log("Args >>"+queryOptions.args);
    // Evaluate the specified transaction.
    //const param = '{"mobile_no": "0990000001","mobile_id_sn": "3","issuer":"CWN"}';
    response = await contract.evaluateTransaction(queryOptions.fcn, queryOptions.args[0]);
    //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    //return JSON.parse(response.toString())

    try{
      return JSON.parse(response.toString())
    }catch(e){
      return JSON.parse('{"status":"OK","msg":"Operation is successful"}')
    }
  } catch (e) {
    console.log(e)
    throw e 
  }
}

module.exports = mobileid_query
