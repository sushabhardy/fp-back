import { makeApplicant, makeSubmission } from '../entity/index.js'

/**
 * Create post
 * @param {applicantDb}
 */
const makeApplyAudition = ({ applicantsDb, submissionsDb, makeTransaction }) => {
  return async ({ applicant }) => {
    const result = await makeTransaction(async transaction => {
      const newApplicant = makeApplicant({ ...applicant })
      const { modifiedCount } = await applicantsDb.addApplicant({ ...newApplicant }, transaction)

      const { submissions } = applicant
      const newSubmissions = submissions.map(submission => Object.values(makeSubmission({ ...submission, auditionId: newApplicant.auditionId, applicantId: newApplicant.applicantId })))
      await submissionsDb.addSubmissions({ submissions: newSubmissions }, transaction)

      return { modifiedCount }
    })
    return result
  }
}

export default makeApplyAudition
