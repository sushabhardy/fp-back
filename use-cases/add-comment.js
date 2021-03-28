import { makeComment } from '../entity/index.js'

/**
 * Add comment
 * @param {commentsDb}
 */
const makeAddComment = ({ commentsDb, makeTransaction }) => {
  return async ({ comment }) => {
    const result = await makeTransaction(async transaction => {
      const newComment = makeComment({ ...comment })
      const { modifiedCount } = await commentsDb.addComment({ ...newComment }, transaction)
      return { modifiedCount }
    })
    return result
  }
}

export default makeAddComment
