/**
 * Get User Photos Handler
 * @param {getUserPhotosUseCase, validationResult}
 */
const makeGetUserPhotosHandler = ({ getUserPhotos, validationResult }) => {
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

      const { photos, photosCount, since } = await getUserPhotos({ uid, after, limit })

      res
        .status(200)
        .json({
          after: since,
          success: true,
          photos: photos,
          photosCount: photosCount,
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

export default makeGetUserPhotosHandler
