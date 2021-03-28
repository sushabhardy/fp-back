/**
 * Get all comments for a post
 * @param {commentsDb}
 */
const makeGetComments = ({ commentsDb, makeTransaction }) => {
  return async ({ postId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { comments, commentsCount, since } = await commentsDb.getComments({ postId, after, limit }, transaction)
      return { comments, commentsCount, since }
    })
    return result
  }
}

export default makeGetComments
