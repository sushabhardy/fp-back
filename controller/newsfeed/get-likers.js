/**
 * Get comments Handler
 * @param {getLikersUsecase, validationResult}
 */
const makeGetLikersHandler = ({ getLikers, validationResult }) => {
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

      const { postId, after, limit } = req.query

      const { likers, likersCount, since } = await getLikers({ postId, after, limit })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          after: since,
          likers: likers,
          likersCount: likersCount
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

export default makeGetLikersHandler
