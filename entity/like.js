const buildMakeLike = ({ makeId }) => {
  return ({
    id = makeId(),
    postId,
    likeTime = new Date(),
    likerId
  }) => {
    if (!postId) {
      throw new Error('Like must have a postId')
    }
    if (!likerId) {
      throw new Error('Like must have a likerId')
    }
    return Object.freeze({
      id,
      likeTime,
      likerId,
      postId
    })
  }
}

export default buildMakeLike
