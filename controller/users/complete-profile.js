/**
 * Complete Profile Handler
 * @param {completeProfile, validationResult}
 */
const makeCompleteProfileHandler = ({ completeProfile, validationResult }) => {
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
       * Get 'profile' from body
       */
      const { profile } = req.body

      await completeProfile({ profile })

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

export default makeCompleteProfileHandler
