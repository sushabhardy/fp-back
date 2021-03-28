/**
 * Update user presence
 * @param {presenceDb}
 */
const makeUpdateUserPresence = ({ presenceDb, makeTransaction }) => {
  return async ({ userId, status }) => {
    const result = await makeTransaction(async transaction => {
      // Update presence
      const { present } = await presenceDb.userPresenceExists({ userId })
      if (present) {
        await presenceDb.updateUserStatus({ userId, status }, transaction)
      } else {
        await presenceDb.addUserStatus({ userId }, transaction)
      }
    })
    return result
  }
}

export default makeUpdateUserPresence
