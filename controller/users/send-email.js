/**
 * Send email Handler
 * @param {sendEmailUsecase, validationResult}
 */
const makeSendEmailHandler = ({ sendEmail, validationResult }) => {
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

      /**
       * Get toEmail, toName, subject, content, fromEmail, fromName body
       */
      const { toEmail, subject, content, fromEmail, replyTo } = req.body

      await sendEmail({ toEmail, subject, content, fromEmail, replyTo })

      res
        .status(200)
        .json({
          success: true,
          error: false
        })
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({
          success: false,
          error: true,
          message: e.message
        })
    }
  }
}

export default makeSendEmailHandler
