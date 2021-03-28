const buildMakePost = ({ makeId }) => {
  return ({
    id = makeId(),
    creatorId,
    createdTime = new Date(),
    updatedTime = new Date(),
    body,
    title
  }) => {
    if (!creatorId) {
      throw new Error('Post must have a creator')
    }
    if (!body) {
      throw new Error('Post must have a body')
    }
    if (!title) {
      throw new Error('Post must have a title')
    }
    return Object.freeze({
      creatorId,
      createdTime,
      updatedTime,
      title,
      body,
      id
    })
  }
}

export default buildMakePost
