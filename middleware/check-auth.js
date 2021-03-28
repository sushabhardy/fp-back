/**
 * Middleware to allow only authenticated users to request API.
 */
const makeCheckAuth = ({ jwt, authAdmin }) => {
  return async (req, res, next) => {
    try {
      const { originalUrl } = req
      if (originalUrl.includes('auth')) {
        // Do not check auth headers if it is an authentication request
        return next()
      }
      const tokens = req.headers?.authorization?.split(',') // SP TOKEN,IDP TOKEN
      const spToken = tokens[0].split(' ')[1]
      const idpToken = tokens[1].split(' ')[1]
      if (!spToken || !idpToken) {
        throw new Error('Invalid Token')
      }
      // Verify spToken
      const decodedSPToken = jwt.verify(spToken, process.env.SECRET_KEY)

      // Verify idpToken
      const decodedIdpToken = await authAdmin.verifyIdpToken({ idpToken })
      req.auth = { ...decodedIdpToken, ...decodedSPToken }
      return next()
    } catch (e) {
      console.log(e)
      const error = new Error('Invalid access token', 500)
      return next(error)
    }
  }
}

export default makeCheckAuth
