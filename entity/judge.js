const buildMakeJudge = ({ makeId }) => {
  return ({
    id = makeId(),
    name,
    auditionId,
    secret
  }) => {
    if (!id) {
      throw new Error('Judge must have a id')
    }
    if (!auditionId) {
      throw new Error('Judge must have a auditionId')
    }
    if (!secret) {
      throw new Error('Judge must have a secret')
    }
    return Object.freeze({
      id,
      auditionId,
      secret,
      name
    })
  }
}

export default buildMakeJudge
