/**
 * Check username is available or not
 * @param {applicantDb}
 */
const makeCheckUsernameAvailable = ({ usersDb, makeTransaction }) => {
  return async ({ username }) => {
    const result = await makeTransaction(async transaction => {
      const { exists } = await usersDb.checkUsernameExists({ username }, transaction)
      return { exists }
    })
    return result
  }
}

export default makeCheckUsernameAvailable
