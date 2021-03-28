/**
 * Get User presence Handler
 * @param {getUserPresence, validationResult}
 */
const makeGetUserPresenceHandler = ({ getUserPresence, validationResult }) => {
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
       * Get 'uid' from token
       */
      const userId = req.auth.uid

      const { status, lastSignInTime } = await getUserPresence({ userId })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          status,
          lastSignInTime
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

export default makeGetUserPresenceHandler
