/**
 * Get Profile Handler
 * @param {followUserUsecase, validationResult}
 */
const makeFollowUserHandler = ({ followUser, validationResult }) => {
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
       * Get 'uid', 'followeeId' from path params
       */
      const { followeeId } = req.params
      const uid = req.auth.uid

      const { followed } = await followUser({ followerId: uid, followeeId })

      res
        .status(200)
        .json({
          followed: followed,
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

export default makeFollowUserHandler
