/**
 * Apply for verificatoin handler
 * @param {applyForVerification, validationResult}
 */
const makeApplyForVerificationHandler = ({ applyForVerification, validationResult }) => {
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
       * Get details from body
       */
      const { aadhaarFrontSrc, aadhaarBackSrc, panFrontSrc, panBackSrc, dlFrontSrc, dlBackSrc, artisitAssociationCardSrc } = req.body
      const applicantId = req.auth.uid

      const { exists } = await applyForVerification({ aadhaarFrontSrc, aadhaarBackSrc, panFrontSrc, panBackSrc, dlFrontSrc, dlBackSrc, artisitAssociationCardSrc, applicantId })

      res
        .status(200)
        .json({
          success: true,
          error: false,
          exists: exists
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

export default makeApplyForVerificationHandler
