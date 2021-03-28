/**
 * Get users by firstName Handler
 * @param {getUsersByFirstNameOrLastNameUsecase, validationResult}
 */
const makeGetUsersByFirstNameOrLastNameHandler = ({ getUsersByFirstNameOrLastName, validationResult }) => {
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
       * Get after,limit, queryString query params
       * after, limit for pagination
       */
      const { after, limit, queryString } = req.query

      const { users, usersCount, since } = await getUsersByFirstNameOrLastName({ after, limit, queryString })

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

export default makeGetUsersByFirstNameOrLastNameHandler
