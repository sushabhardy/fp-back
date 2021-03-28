const buildMakeAuditionResult = ({ makeId }) => {
  return ({
    id = makeId(),
    applicantId,
    auditionId,
    judgeId,
    score
  }) => {
    if (!applicantId) {
      throw new Error('Applicants audition result must have a applicantId')
    }
    if (!auditionId) {
      throw new Error('Applicants audition result must have a auditionId')
    }
    if (!judgeId) {
      throw new Error('Applicants audition result must have a judgeId')
    }
    return Object.freeze({
      id,
      applicantId,
      auditionId,
      judgeId,
      score
    })
  }
}

export default buildMakeAuditionResult
