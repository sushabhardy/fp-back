/**
 * Maker for generating jwt
 * @param {jwt} jwt
 */
const makeGenerateSpToken = ({ jwt }) => {
  return ({ id }) => {
    try {
      const spToken = jwt.sign(
        { userId: id },
        process.env.SECRET_KEY
      )
      return spToken
    } catch (e) {
      console.log(e)
      throw new Error('Unable to authenticate with jwt')
    }
  }
}

export default makeGenerateSpToken
