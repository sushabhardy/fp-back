/**
 * Get all applicants
 * @param {applicantsDb}
 */
const makeGetApplicants = ({ applicantsDb, makeTransaction }) => {
  return async ({ auditionId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { applicants, applicantsCount, since } = await applicantsDb.getApplicants({ auditionId, after, limit }, transaction)
      return { applicants, applicantsCount, since }
    })
    return result
  }
}

export default makeGetApplicants
