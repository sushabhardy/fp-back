/**
 * Get all likers for a post
 * @param {likesDb}
 */
const makeGetLikers = ({ likesDb, makeTransaction }) => {
  return async ({ postId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { likers, likersCount, since } = await likesDb.getLikers({ postId, after, limit }, transaction)
      return { likers, likersCount, since }
    })
    return result
  }
}

export default makeGetLikers
