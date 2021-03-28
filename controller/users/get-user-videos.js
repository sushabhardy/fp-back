/**
 * Get User Videos Handler
 * @param {getUserVideosUseCase, validationResult}
 */
const makeGetUserVideosHandler = ({ getUserVideos, validationResult }) => {
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
       * Get 'uid' from path params
       */
      const { uid } = req.params
      const { after, limit } = req.query

      const { videos, videosCount, since } = await getUserVideos({ uid, after, limit })

      res
        .status(200)
        .json({
          success: true,
          after: since,
          videos: videos,
          videosCount: videosCount,
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

export default makeGetUserVideosHandler
