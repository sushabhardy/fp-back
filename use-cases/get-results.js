/**
 * Get audition results
 * @param {auditionResultsDb}
 */
const makeGetResults = ({ auditionResultsDb, makeTransaction }) => {
  return async ({ auditionId, applicantId }) => {
    const result = await makeTransaction(async transaction => {
      const { results } = await auditionResultsDb.getApplicantScores({ auditionId, applicantId }, transaction)
      const scores = {}
      for (const { judgeId, score } of results) {
        scores[judgeId] = { score: score }
      }
      return { scores }
    })
    return result
  }
}

export default makeGetResults
