/**
 * Post Likes Handler
 * @param {addLike, validationResult}
 */
const makeLikeHandler = ({ addLike, validationResult }) => {
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

      const { postId } = req.body
      const likerId = req.auth.uid
      const { liked } = await addLike({ likerId, postId })

      res
        .status(200)
        .json({
          liked: liked,
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

export default makeLikeHandler
