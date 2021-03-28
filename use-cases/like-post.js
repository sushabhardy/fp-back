import { makeLike } from '../entity/index.js'

/**
 * Post like
 * @param {likesDb}
 */
const makeAddLike = ({ likesDb, makeTransaction }) => {
  return async ({ likerId, postId }) => {
    const result = await makeTransaction(async transaction => {
      const { likeId } = await likesDb.fetchByLikerIdAndPostId({ likerId, postId }, transaction)

      /*
     * If already liked, do dislike otherwise do like
     */
      if (likeId) {
        await likesDb.deleteLike({ likeId }, transaction)
        return { liked: false }
      } else {
        const like = makeLike({ likerId, postId })
        await likesDb.insertLike({ ...like }, transaction)
        return { liked: true }
      }
    })
    return result
  }
}

export default makeAddLike
