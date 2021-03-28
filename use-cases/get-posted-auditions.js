/**
 * Get all auditions posted by user
 * @param {auditionsDb}
 */
const makeGetPostedAuditions = ({ auditionsDb, makeTransaction }) => {
  return async ({ userId, after, limit }) => {
    const result = await makeTransaction(async transaction => {
      const { auditions, auditionsCount, since } = await auditionsDb.getPostedAuditions({ userId, after, limit }, transaction)
      return { auditions, auditionsCount, since }
    })
    return result
  }
}

export default makeGetPostedAuditions
