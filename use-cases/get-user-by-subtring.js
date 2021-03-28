/**
 * Get all users by substring filtered from DB
 * @param {usersDb}
 */
const makeGetUsers = ({ usersDb, makeTransaction }) => {
  return async ({ after, limit, username }) => {
    const result = await makeTransaction(async transaction => {
      const { users, usersCount, since } = await usersDb.findUsersBySubstring({ after, limit, username }, transaction)
      return { users, usersCount, since }
    })
    return result
  }
}

export default makeGetUsers
