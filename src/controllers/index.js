module.exports = {
  healthCheck: require('./healthCheck'),

  enrollMobileId: require('./enrollMobileId'),
  updateMobileId: require('./updateMobileId'),
  
  recordConsentLog: require('./recordConsentLog'),
  retrieveMobileId: require('./retrieveMobileId'),
  updateVerifyResult: require('./updateVerifyResult'),

  getConsentLog: require('./getConsentLog'),

  enrollAdmin: require('./enrollAdmin'),
  registerUserForce: require('./registerUserForce'),

  getMember: require('./getMember'),
  listMembers: require('./listMembers'),
  createMember: require('./createMember'),
  updateMember: require('./updateMember'),
}
