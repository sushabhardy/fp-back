/**
 * Get users by substring Handler
 * @param {getUsersBySubstringUsecase, validationResult}
 */
const makeGetUsersHandler = ({ getUsersBySubstring, validationResult }) => {
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
       * Get 'after', 'limit' and username query params for pagination
       */
      const { after, limit, username } = req.query

      const { users, usersCount, since } = await getUsersBySubstring({ after, limit, username })

      res
        .status(200)
        .json({
          success: true,
          users: users,
          usersCount: usersCount,
          error: false,
          after: since
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

export default makeGetUsersHandler
