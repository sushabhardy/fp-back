/**
 * Apply auditions Handler
 * @param {applyAuditionUsecase, validationResult}
 */
const makeApplyAuditionHandler = ({ applyAudition, validationResult }) => {
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

      const { applicant } = req.body

      // TODO: Add return values
      await applyAudition({ applicant })

      res
        .status(200)
        .json({
          success: true,
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

export default makeApplyAuditionHandler
