/**
 * Get Score by each judge for an audition, applicant
 * @param {getResults, validationResult}
 */
const makeGetResultsHandler = ({ getResults, validationResult }) => {
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

      const { auditionId, applicantId } = req.query
      const { scores } = await getResults({ auditionId, applicantId })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          scores: scores
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

export default makeGetResultsHandler
