const buildMakeVerificationApplication = ({ makeId }) => {
  return ({
    aadhaarFrontSrc,
    aadhaarBackSrc,
    panFrontSrc,
    panBackSrc,
    dlFrontSrc,
    dlBackSrc,
    artisitAssociationCardSrc,
    applicantId,
    applyTime = new Date()
  }) => {
    if (!applicantId) {
      throw new Error('Verification application must have a applicantId')
    }
    return Object.freeze({
      aadhaarFrontSrc,
      aadhaarBackSrc,
      panFrontSrc,
      panBackSrc,
      dlFrontSrc,
      dlBackSrc,
      artisitAssociationCardSrc,
      applicantId,
      applyTime
    })
  }
}

export default buildMakeVerificationApplication
