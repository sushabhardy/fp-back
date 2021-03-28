/**
 * Get all recent auditions
 * @param {auditionsDb}
 */
const makeGetRecentAuditions = ({ auditionsDb, makeTransaction }) => {
  return async ({ userId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { auditions, auditionsCount, since } = await auditionsDb.getRecentAuditions({ userId, after, limit }, transaction)
      return { auditions, auditionsCount, since }
    })
    return result
  }
}

export default makeGetRecentAuditions
