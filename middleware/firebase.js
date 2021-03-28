/**
 * SSO Middleware.
 */
const makeAuthAdmin = ({ auth }) => {
  /**
   * Generate customToken
   * @param {uid}
   */
  const generateCustomToken = async ({ uid }) => {
    const idpToken = await auth.createCustomToken(uid)
    return idpToken
  }

  /**
   * Verify the idpToken
   * @param {idpToken}
   */
  const verifyIdpToken = async ({ idpToken }) => {
    const decodedIdpToken = await auth.verifyIdToken(idpToken)
    return { ...decodedIdpToken }
  }

  return Object.freeze({
    generateCustomToken,
    verifyIdpToken
  })
}

export default makeAuthAdmin
