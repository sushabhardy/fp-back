/**
 * Get auditions Handler
 * @param {getAuditionsUsecase, validationResult}
 */
const makeGetAuditionsHandler = ({ getAuditions, validationResult }) => {
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

      const { after, limit, category, languages, city, gender, ageLower, ageUpper } = req.query
      const userId = req.auth.uid

      const { auditions, auditionsCount, since } = await getAuditions({ userId, category, languages, city, gender, ageLower, ageUpper, after, limit })

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

export default makeGetAuditionsHandler
