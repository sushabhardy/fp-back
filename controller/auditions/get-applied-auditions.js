/**
 * Get Applied Auditions Handler
 * @param {getAppliedAuditionsUsecase, validationResult}
 */
const makeGetAppliedAuditionsHandler = ({ getAppliedAuditions, validationResult }) => {
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

      const { after, limit } = req.query
      const userId = req.auth.uid

      const { auditions, auditionsCount, since } = await getAppliedAuditions({ userId, after, limit })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          after: since,
          auditions: auditions,
          auditionsCount: auditionsCount
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

export default makeGetAppliedAuditionsHandler
