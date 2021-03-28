/**
 * Get user presence
 * @param {presenceDb}
 */
const makeGetUserPresence = ({ presenceDb, makeTransaction }) => {
  return async ({ userId }) => {
    const result = await makeTransaction(async transaction => {
      const { status, lastSignInTime } = await presenceDb.getUserStatus({ userId }, transaction)
      return { status, lastSignInTime }
    })
    return result
  }
}

export default makeGetUserPresence
