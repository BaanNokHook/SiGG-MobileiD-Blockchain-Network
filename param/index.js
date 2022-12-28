const orgMspName = 'AISMSP';
const orgAffiliation = 'org1.department1';
const userName = 'user1';
const caName = 'ca.ais.mobileid.com';
const ldapName = 'ldap.ais.mobileid.com';

const homeUserDir = '/home/ubuntu/';

const channelName = 'mobileid';
const chaincodeName = 'mobileidcc';

const port = '3003';

const config = {
  orgMspName: orgMspName,
  orgAffiliation: orgAffiliation,
  userName: userName,
  caName: caName,
  ldapName: ldapName,

  homeUserDir: homeUserDir,

  channelName: channelName,
  chaincodeName: chaincodeName,

  port: port,
}

module.exports = config
