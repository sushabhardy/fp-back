/**
 * Get posts bookmarked by user Handler
 * @param {getPostsBookmarkedByUser, validationResult}
 */
const makeGetPostsBookmarkedByUserHandler = ({ getPostsBookmarkedByUser, validationResult }) => {
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
       * Get userId, after, limit from path params
       */
      const { after, limit } = req.query
      const userId = req.auth.uid

      const { posts, postsCount, since } = await getPostsBookmarkedByUser({ userId, after, limit })

      res
        .status(200)
        .json({
          success: true,
          posts: posts,
          postsCount: postsCount,
          since: since,
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

export default makeGetPostsBookmarkedByUserHandler
