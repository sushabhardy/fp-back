const buildMakeSubmission = ({ makeId }) => {
  return ({
    id = makeId(),
    submissionTime = new Date(),
    submissionUrl,
    submissionType,
    auditionId,
    applicantId
  }) => {
    if (!applicantId) {
      throw new Error('Submission must have a applicantId')
    }
    if (!auditionId) {
      throw new Error('Submission must have a auditionId')
    }
    if (!submissionUrl) {
      throw new Error('Submission must have a media url')
    }
    if (!submissionType) {
      throw new Error('Submission must have a type')
    }
    return Object.freeze({
      id,
      submissionTime,
      submissionType,
      submissionUrl,
      applicantId,
      auditionId
    })
  }
}

export default buildMakeSubmission
