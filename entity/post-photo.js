const buildMakePostPhoto = ({ makeId }) => {
  return ({
    postId,
    uploadTime = new Date(),
    src,
    id = makeId()
  }) => {
    if (!postId) {
      throw new Error('Post photo must have a postId')
    }
    if (!src) {
      throw new Error('Post photo must have a src')
    }
    return Object.freeze({
      id,
      src,
      uploadTime,
      postId
    })
  }
}

export default buildMakePostPhoto
