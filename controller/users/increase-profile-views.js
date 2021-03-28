/**
 * Increase profile views
 * @param {increaseProfileViews, validationResult}
 */
const makeIncreaseProfileViewsHandler = ({ increaseProfileViews, validationResult }) => {
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
       * Get 'userId' from query
       */
      const { userId } = req.query

      await increaseProfileViews({ userId })

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

export default makeIncreaseProfileViewsHandler
