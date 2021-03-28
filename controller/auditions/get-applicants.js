/**
 * Get Applicants Handler
 * @param {getApplicantsUsecase, validationResult}
 */
const makeGetApplicantsHandler = ({ getApplicants, validationResult }) => {
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

      const { auditionId, after, limit } = req.query

      const { applicants, applicantsCount, since } = await getApplicants({ auditionId, after, limit })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          after: since,
          applicants: applicants,
          applicantsCount: applicantsCount
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

export default makeGetApplicantsHandler
