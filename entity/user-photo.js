const buildMakeUserPhoto = ({ makeId }) => {
  return ({
    id = makeId(),
    src,
    uploadTime = new Date(),
    userId
  }) => {
    if (!src) {
      throw new Error('Photo must have a src')
    }
    if (!userId) {
      throw new Error('Photo must have a userId')
    }
    return Object.freeze({
      id,
      src,
      uploadTime,
      userId
    })
  }
}

export default buildMakeUserPhoto
