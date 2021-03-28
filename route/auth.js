import { authValidations } from '../validation/index.js'
import { sendOtpHandler, verifyOtpHandler, resendOtpHandler, verifySSOHandler } from '../controller/auth/index.js'

/**
 * Authentication routes
 * @param {router} router
 */
const makeAuthRoutes = ({ router }) => {
  router.post('/api/v1/auth/sendOTP', authValidations.SEND_OTP_VALIDATIONS, sendOtpHandler)
  router.post('/api/v1/auth/verifyOTP', authValidations.VERIFY_OTP_VALIDATIONS, verifyOtpHandler)
  router.post('/api/v1/auth/verifySSO', authValidations.VERIFY_SSO_VALIDATIONS, verifySSOHandler)
  router.post('/api/v1/auth/resendOTP', authValidations.RESEND_OTP_VALIDATIONS, resendOtpHandler)
  return router
}

export default makeAuthRoutes
