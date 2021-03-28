/**
 * Add Judge Handler
 * @param {addJudgeUsecase, validationResult}
 */
const makeAddJudgeHandler = ({ addJudge, validationResult }) => {
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

      const { judge } = req.body
      await addJudge({ judge })

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

export default makeAddJudgeHandler
