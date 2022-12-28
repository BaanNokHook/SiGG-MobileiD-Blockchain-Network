/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const configParam = require('../../param');

const ccpPath = path.resolve(process.cwd(), '', 'connection.json');

const registerUserForce = async (req, res) => {
    var message;
    var m1;
    var m2;

    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(req.body.username);
        if (userExists) {
            await wallet.delete(req.body.username);
            // message = 'An identity for the user "' + req.body.username +'" already exists in the wallet';
            // console.log(message);
            // return res.json({ "message": message })
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            m1 = 'An identity for the admin user "admin" does not exist in the wallet';
            m2 = 'Run the enrollAdmin.js application before retrying'
            console.log(m1);
            console.log(m2);
            return res.json({ "message": m1 + "\n" + m2 })
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: false } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        const ids = ca.newIdentityService();
        var isExists = false;
        try{
            const userExistsInCA = await ids.getOne(req.body.username, adminIdentity);
            isExists = true;
        }
        catch(e){
        }
        finally{
        }

        if (isExists) {
            console.log('An identity for the user "' + req.body.username +'" already exists in the wallet');
            console.log('Remove "' + req.body.username +'" in the wallet');
            await ids.delete(req.body.username, adminIdentity, true);
            // return;
        }

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
          affiliation: configParam.orgAffiliation,
          enrollmentID: req.body.username,
          enrollmentSecret: req.body.password,
          maxEnrollments: -1,
          role: 'client'
        }, adminIdentity);
        const enrollment = await ca.enroll({
          enrollmentID: req.body.username,
          enrollmentSecret: req.body.password
        });
        const userIdentity = X509WalletMixin.createIdentity(configParam.orgMspName, enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(req.body.username, userIdentity);
        message = 'Successfully registered and enrolled admin user "' + req.body.username +'" and imported it into the wallet';
        console.log(message);
        return res.json({ "message": message })

    } catch (error) {
        message = `Failed to register user "' + req.body.username +'": ${error}`
        console.error(message);
        return res.json({ "message": message })
        // process.exit(1);
    }
}

module.exports = registerUserForce;
