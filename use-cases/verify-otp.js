/**
 * Verifying OTP
 * @param { otpDb, usersDb, generateSpToken, generateIdpToken }
 */
const makeVerifyOtp = ({ otpDb, usersDb, generateSpToken, verifyIdpToken, makeTransaction }) => {
  return async ({ mobile, otp, userId, idpToken }) => {
    const result = await makeTransaction(async transaction => {
      const verifyTime = new Date()

      /**
     * Update 'otp' table
     */
      const { rowCount } = await otpDb.verifyOtp({ mobile, otp, userId, verifyTime }, transaction)
      if (!rowCount) {
        throw new Error('Authentication failed')
      }

      /**
     * Retrieve 'existingUser'
     */
      const { existingUser } = await usersDb.findByIdAndMobile({ userId, mobile }, transaction)
      if (!existingUser) {
        throw new Error('User does not exist')
      }

      /**
     * Generate spToken
     */
      const spToken = generateSpToken({ userId: userId })

      /**
     * Generate idpToken
     */
      await verifyIdpToken({ idpToken })
      const { firstName, lastName } = existingUser
      return {
        spToken: spToken,
        idpToken: idpToken,
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`
      }
    })
    return result
  }
}
export default makeVerifyOtp
