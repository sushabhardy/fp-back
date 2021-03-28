/**
 * Get Profile Handler
 * @param {getProfileUsecase, validationResult}
 */
const makeGetProfileHandler = ({ getProfile, validationResult }) => {
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

      const { completeProfile } = await getProfile({ uid })

      res
        .status(200)
        .json({
          success: true,
          profile: completeProfile,
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

export default makeGetProfileHandler
