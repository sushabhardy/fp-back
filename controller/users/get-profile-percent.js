/**
 * Get Profile Percent Handler
 * @param {getProfilePercentUsecase, validationResult}
 */
const makeGetProfilePercentHandler = ({ getProfilePercentage, validationResult }) => {
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
      const uid = req.auth.uid

      const { profilePercent } = await getProfilePercentage({ uid })

      res
        .status(200)
        .json({
          success: true,
          profilePercent: profilePercent,
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

export default makeGetProfilePercentHandler
