/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const configParam = require('../../param');
const ccpPath = path.resolve(process.cwd(), '', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const enrollAdmin = async (req, res) => {
    var message;
    try {

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[configParam.caName].url; //ca.ais.mobileid.com
        const ca = new FabricCAServices(caURL);
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (adminExists) {
            message = 'An identity for the admin user "admin" already exists in the wallet';
            console.log(message);
            return res.json({ "message": message })
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const identity = X509WalletMixin.createIdentity(configParam.orgMspName, enrollment.certificate, enrollment.key.toBytes());
        await wallet.import('admin', identity);
        message = 'Successfully enrolled admin user "admin" and imported it into the wallet'
        console.log(message);
        return res.json({ "message": message })
        
    } catch (error) {
        message = `Failed to enroll admin user "admin": ${error}`
        console.error(message);
        return res.json({ "message": message })
        // process.exit(1);
    }
}

module.exports = enrollAdmin;
