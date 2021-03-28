/**
 * Check username available handler
 * @param {checkUsernameAvailable, validationResult}
 */
const makeCheckUsernameAvailableHandler = ({ checkUsernameAvailable, validationResult }) => {
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
       * Get 'username' from query
       */
      const { username } = req.query

      const { exists } = await checkUsernameAvailable({ username })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          exists: exists
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

export default makeCheckUsernameAvailableHandler
