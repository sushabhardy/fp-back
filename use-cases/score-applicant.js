import { makeAuditionResult } from '../entity/index.js'

/**
 * Score applicant
 * @param {auditionResultsDb, makeTransaction}
 */
const scoreApplicant = ({ auditionResultsDb, makeTransaction }) => {
  return async ({ score, applicantId, judgeId, auditionId }) => {
    const result = await makeTransaction(async transaction => {
      const { resultId } = await auditionResultsDb.fetchResult({ applicantId, judgeId, auditionId }, transaction)
      if (resultId) {
        const { rowCount } = await auditionResultsDb.updateResult({ score, resultId }, transaction)
        return { modifiedCount: rowCount }
      } else {
        const auditionResult = makeAuditionResult({ score, applicantId, judgeId, auditionId })
        const { modifiedCount } = await auditionResultsDb.addResult({ ...auditionResult }, transaction)
        return { modifiedCount }
      }
    })
    return result
  }
}

export default scoreApplicant
