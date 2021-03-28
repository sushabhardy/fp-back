/**
 * Verify SSO Handler
 * @param {verifySSOUsecase, validationResult}
 */
const makeVerifySSOHandler = ({ verifySSO, validationResult }) => {
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

      // TODO Get other user fields
      const { idpToken, displayName, email, googleId } = req.body
      const profile = await verifySSO({ idpToken, displayName, email, googleId })
      res
        .status(200)
        .json({
          success: true,
          error: false,
          ...profile
        })
    } catch (e) {
      console.log(e)
      res
        .status(200)
        .json({
          error: true,
          success: false,
          message: e.message
        })
    }
  }
}

export default makeVerifySSOHandler
