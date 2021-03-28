/**
 * VerifyOTP Handler
 * @param {verifyOTPUsecase, validationResult}
 */
const makeVerifyOtpHandler = ({ verifyOTP, validationResult }) => {
  return async (req, res, next) => {
    try {
      /**
       * To Check if req is valid
       */
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const error = new Error('Invalid inputs')
        return next(error)
      }

      const { mobile, idpToken, otp, userId } = req.body
      const { spToken, firstName, lastName, name } = await verifyOTP({ mobile, otp, userId, idpToken })
      res
        .status(200)
        .json({
          success: true,
          error: false,
          userId,
          spToken,
          idpToken,
          mobile,
          firstName,
          lastName,
          name
        })
    } catch (e) {
      console.log(e)
      res
        .status(200)
        .json({
          error: true,
          success: false,
          message: e.message
        })
    }
  }
}

export default makeVerifyOtpHandler
