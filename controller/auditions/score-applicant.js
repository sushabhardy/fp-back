/**
 * Score applicant Handler
 * @param {scoreApplicant, validationResult}
 */
const makeScoreApplicantHandler = ({ scoreApplicant, validationResult }) => {
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

      const { score, applicantId, judgeId, auditionId } = req.body

      await scoreApplicant({ score, applicantId, judgeId, auditionId })

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

export default makeScoreApplicantHandler
