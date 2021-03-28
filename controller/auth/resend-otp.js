/**
 * Re-sendOTP Handler
 * @param {sendOTPUsecase, validationResult}
 */
const makeResendOtpHandler = ({ resendOTP, validationResult }) => {
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

      const { mobile } = req.body
      const { userId } = await resendOTP({ mobile })
      res
        .status(200)
        .json({
          success: true,
          userId: userId,
          error: false
        })
    } catch (e) {
      console.log(e)
      res
        .status(500)
        .json({
          success: false,
          error: true,
          message: e.message
        })
    }
  }
}

export default makeResendOtpHandler
