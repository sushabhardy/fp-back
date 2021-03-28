/**
 * Get users Handler
 * @param {getUsersUsecase, validationResult}
 */
const makeGetUsersHandler = ({ getUsers, validationResult }) => {
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
       * Get category, languages, city, gender, ageLower, ageUpper, uid query params
       * after, limit for pagination
       */
      const { after, limit, category, languages, city, gender, ageLower, ageUpper } = req.query
      const uid = req.auth.uid

      const { users, usersCount, since } = await getUsers({ after, limit, category, languages, city, gender, ageLower, ageUpper, uid })

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
