const buildMakeComment = ({ makeId }) => {
  return ({
    id = makeId(),
    postId,
    comment,
    commentorId,
    createdTime = new Date(),
    updatedTime = new Date()
  }) => {
    if (!postId) {
      throw new Error('Comment must have a postId')
    }
    if (!commentorId) {
      throw new Error('Comment must have a commentorId')
    }
    if (!comment) {
      throw new Error('Comment must have a comment')
    }
    return Object.freeze({
      id,
      createdTime,
      commentorId,
      updatedTime,
      comment,
      postId
    })
  }
}

export default buildMakeComment
