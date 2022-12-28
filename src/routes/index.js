const express = require('express')
const router = express.Router()
const {
  healthCheck,
  
  enrollMobileId,
  updateMobileId,

  recordConsentLog,
  retrieveMobileId,
  updateVerifyResult,

  getConsentLog,

  getMember,
  listMembers,
  createMember,
  updateMember,

  enrollAdmin,
  registerUserForce,
} = require('../controllers')
const { auth } = require('../middlewares')

router.get('/health-check', healthCheck)

router.post('/enroll-mobileid', auth, enrollMobileId)
router.post('/update-mobileid', auth, updateMobileId)

router.post('/record-consent', auth, recordConsentLog)
router.post('/retrieve-mobileid-and-update-consent-log', auth, retrieveMobileId)
router.post('/update-verification-result', auth, updateVerifyResult)

router.post('/get-consent-log', auth, getConsentLog)

router.post('/get-member', auth, getMember)
router.post('/list-member', auth, listMembers)
router.post('/create-member', auth, createMember)
router.post('/update-member', auth, updateMember)

router.post('/enroll-admin', auth, enrollAdmin)
router.post('/register-user', auth, registerUserForce)

module.exports = router
