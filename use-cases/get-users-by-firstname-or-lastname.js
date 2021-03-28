/**
 * Get all users by firstname or lastname based on queryString filtered from DB
 * @param {usersDb}
 */
const makeGetUsersByFirstNameOrLastName = ({ usersDb, makeTransaction }) => {
  return async ({ after, limit, queryString }) => {
    const result = await makeTransaction(async transaction => {
      const { users, usersCount, since } = await usersDb.findUsersByFirstNameOrLastName({ after, limit, queryString }, transaction)
      return { users, usersCount, since }
    })
    return result
  }
}

export default makeGetUsersByFirstNameOrLastName
