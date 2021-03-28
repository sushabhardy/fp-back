/**
 * Get posts Handler
 * @param {getPostsUsecase, validationResult}
 */
const makeGetPostsHandler = ({ getPosts, validationResult }) => {
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
       * Get 'after' and 'limit' query params for pagination
       */
      const { after, limit } = req.query
      const userId = req.auth.uid

      const { posts, postsCount, since } = await getPosts({ userId, after, limit })

      res
        .status(200)
        .json({
          success: true,
          posts: posts,
          postsCount: postsCount,
          after: since,
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

export default makeGetPostsHandler
