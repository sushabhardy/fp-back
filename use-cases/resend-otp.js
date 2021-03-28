import { makeOtp } from '../entity/index.js'

/**
 * Resend OTP (3 mins validity) to user and save in DB
 * @param { otpDb, usersDb, makeOtp, sendSMS }
 * TODO
 */
const makeResendOtp = ({ otpDb, usersDb, generateOtp, sendSMS, makeTransaction }) => {
  return async ({ mobile }) => {
    const result = await makeTransaction(async transaction => {
      const EXPIRATION_TIME_MINUTES = process.env.OTP_EXPIRATION_MINUTES || 3

      /**
     * Generate OTP
     */
      const otp = generateOtp()
      const expirationTime = new Date((new Date()).getTime() + EXPIRATION_TIME_MINUTES * 60 * 1000)
      const isVerified = false
      const sendTime = new Date()
      const verifyTime = null

      /**
     * Verify if user exists
     */
      const { userId } = await usersDb.findByMobile({ mobile }, transaction)
      if (!userId) {
        throw new Error('User does not exists')
      }

      /**
     * Update 'otp' table
     */
      const OTP = makeOtp({ mobile, expirationTime, isVerified, sendTime, verifyTime, otp, userId })
      const { modifiedCount } = await otpDb.insertOtp({ ...OTP }, transaction)

      /**
     * Send SMS to user mobile
     */
      modifiedCount && await sendSMS({ mobile, message: `Your OTP is ${otp}` })
      return { userId }
    })
    return result
  }
}

export default makeResendOtp
