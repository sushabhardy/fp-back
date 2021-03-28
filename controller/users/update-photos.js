/**
 * Update Profile photos Handler
 * @param {updatePhotosUsecase, validationResult}
 */
const makeUpdatePhotosHandler = ({ updatePhotos, validationResult }) => {
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
      const { photos, userId } = req.body

      await updatePhotos({ userId, photos })

      res
        .status(200)
        .json({
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

export default makeUpdatePhotosHandler
