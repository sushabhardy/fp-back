const buildMakeApplicant = ({ makeId }) => {
  return ({
    id = makeId(),
    applicantId,
    auditionId,
    transactionId
  }) => {
    if (!applicantId) {
      throw new Error('Applicant must have a applicantId')
    }
    if (!auditionId) {
      throw new Error('Applicant must have a auditionId')
    }
    return Object.freeze({
      id,
      applicantId,
      auditionId,
      transactionId
    })
  }
}

export default buildMakeApplicant
