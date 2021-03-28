
import {
  sendOTP,
  verifySSO,
  verifyOTP,
  resendOTP
} from '../../use-cases/index.js'
import { validationResult } from 'express-validator'
import makeSendOtpHandler from './send-otp.js'
import makeVerifyOtpHandler from './verify-otp.js'
import makeVerifySSOHandler from './verify-sso.js'
import makeResendOtpHandler from './resend-otp.js'

const sendOtpHandler = makeSendOtpHandler({ sendOTP, validationResult })
const verifyOtpHandler = makeVerifyOtpHandler({ verifyOTP, validationResult })
const verifySSOHandler = makeVerifySSOHandler({ verifySSO, validationResult })
const resendOtpHandler = makeResendOtpHandler({ resendOTP, validationResult })

export {
  sendOtpHandler,
  verifyOtpHandler,
  verifySSOHandler,
  resendOtpHandler
}
