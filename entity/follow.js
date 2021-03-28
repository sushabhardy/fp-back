const buildMakeFollow = ({ makeId }) => {
  return ({
    id = makeId(),
    followerId,
    followTime = new Date(),
    followeeId
  }) => {
    if (!followerId) {
      throw new Error('Follow must have a followerId')
    }
    if (!followeeId) {
      throw new Error('Follow must have a followeeId')
    }
    return Object.freeze({
      id,
      followTime,
      followeeId,
      followerId
    })
  }
}

export default buildMakeFollow
