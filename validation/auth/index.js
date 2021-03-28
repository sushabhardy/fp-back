const makeAuthValidations = ({ body, check, param }) => {
  const SEND_OTP_VALIDATIONS = [body('mobile').exists()]
  const RESEND_OTP_VALIDATIONS = []
  const VERIFY_OTP_VALIDATIONS = [
    body('mobile').exists().isMobilePhone('any'),
    body('otp').exists(),
    body('userId').exists()
  ]

  const VERIFY_SSO_VALIDATIONS = [
    body('idpToken').exists(),
    body('displayName').exists(),
    body('email').exists().isEmail(),
    body('googleId').exists()
  ]

  return Object.freeze({
    SEND_OTP_VALIDATIONS,
    VERIFY_OTP_VALIDATIONS,
    RESEND_OTP_VALIDATIONS,
    VERIFY_SSO_VALIDATIONS
  })
}

export default makeAuthValidations
